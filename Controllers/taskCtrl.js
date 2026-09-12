const Task = require('../Models/task');

const createTask = async (req, res) => {
    try {
        const newTask = await Task.create(req.body);
        newTask._doc.createdBy = req.user;

        res.status(201).json(newTask);
    }
    catch (err) {
        res.status(500).json(err.message);
    }
}
module.exports = { createTask };