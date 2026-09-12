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
        // verify if the username alrady exists
        const userInDatabase = await User.findOne({ username: req.body.username });
        // if the user exists send error msg
        if (userInDatabase) {
            return res.status(409).json({ err: 'Invalid input' });
        }

        // Encrypt the password
        const hashedPassword = bcrypt.hashSync(req.body.password, SALT_ROUNDS);
        req.body.password = hashedPassword;

        // else lets check if the password match
        // if password matches create the new user
        const user = await User.create(req.body);
        const payload = {
            username: user.username,
            _id: user._id,
        };
        console.log(process.env.JWT_SECRET);
        const token = jwt.sign({payload}, process.env.JWT_SECRET);

        res.status(201).json({ user, token });
    } catch (err) {
        console.log(err);
        res.status(500).json({ err: 'something went wrong' });
    }
};


const login = async (req, res) => {
    try {

        const userInDatabase = await User.findOne({ username: req.body.username });

        // only allow users that exist to login
        if (!userInDatabase) {
            return res.status(401).json({ err: 'Invalid credentials' });
        }

        if (!bcrypt.compareSync(req.body.password, userInDatabase.password)) {
            return res.status(401).json({ err: 'Invalid credentials' });

        }

        const payload = {
            username: userInDatabase.username,
            _id: userInDatabase._id
        }

        const token = jwt.sign({payload}, process.env.JWT_SECRET)

        res.status(200).json({ token })

    } catch (error) {
        console.log(error)
    }

};


module.exports = { signToken, verifyToken, signup, login }