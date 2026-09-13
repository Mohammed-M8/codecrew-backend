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
const index = async (req, res) => {
    try {
        const task = await Task.find({ project: req.params.projectId })
            .populate('project')
            .sort({ dueDate: 'desc' });

        res.status(200).json(task);
    }
    catch (err) {
        res.status(500).json(err.message);
    }
}
const show = async (req, res) => {
    try {
        const task = await Task.findById(req.params.taskId).populate('project');

        res.status(200).json(task);
    }
    catch (err) {
        res.status(500).json(err.message);
    }
}
const updateTask = async (req, res) => {
    try {

        const updatedtask = await Task.findByIdAndUpdate(req.params.taskId,
            req.body,
            { new: true }
        );

        res.status(200).json(updatedtask);
    }
    catch (err) {
        res.status(500).json(err.message);
    }
}

const deleteTask = async (req, res) => {
    try {

        const deletedtask = await Task.findByIdAndDelete(req.params.taskId);

        res.status(200).json(deletedtask);
    }
    catch (err) {
        res.status(500).json(err.message);
    }
}
module.exports = { createTask, index, show, updateTask, deleteTask };