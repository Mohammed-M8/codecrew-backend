const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../Models/user')
const SALT_ROUNDS = 10;

const signToken = async (req, res) => {
    try {

        const user = {
            id: 1,
            username: 'test',
            password: 'test',
        };
        const token = jwt.sign({ user }, process.env.JWT_SECRET);
        res.json({ token })
    } catch (error) {
        console.log(error)
    }
};

const verifyToken = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const result = jwt.verify(token, process.env.JWT_SECRET)
        res.json({ result })
    } catch (error) {
        console.log(error)
    }
}


const signup = async (req, res) => {
    try {
        const userInDatabase = await User.findOne({
            $or: [{ username: req.body.username }, { email: req.body.email }]
        });

        if (userInDatabase) {
            return res.status(409).json({ err: 'Username or email already in use' });
        }

        const hashedPassword = bcrypt.hashSync(req.body.password, SALT_ROUNDS);
        req.body.password = hashedPassword;

        const user = await User.create(req.body);

        const payload = {
            username: user.username,
            _id: user._id,
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET);

        res.status(201).json({ user, token });
    } catch (err) {
        console.log(err);
        res.status(500).json({ err: 'something went wrong' });
    }
};

const login = async (req, res) => {
    try {
        const userInDatabase = await User.findOne({ username: req.body.username });

        if (!userInDatabase) {
            return res.status(401).json({ err: 'Invalid credentials' });
        }

        if (!bcrypt.compareSync(req.body.password, userInDatabase.password)) {
            return res.status(401).json({ err: 'Invalid credentials' });
        }

        const payload = {
            username: userInDatabase.username,
            _id: userInDatabase._id
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET);

        res.status(200).json({ user: userInDatabase, token });
    } catch (error) {
        console.log(error);
        res.status(500).json({ err: error.message });
    }
};


module.exports = { signToken, verifyToken, signup, login }