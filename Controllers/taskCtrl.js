const Task = require('../Models/task');

const createTask = async (req, res) => {
    try {
        const newTask = await Task.create({
            ...req.body,
            createdBy: req.user._id
        });

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
            .sort({ dueDate: 1 });

        if (!task) {
            res.status(404).json("this task doesn't exist");
        }

        res.status(200).json(task);
    }
    catch (err) {
        res.status(500).json(err.message);
    }
}
const show = async (req, res) => {
    try {
        const task = await Task.findById(req.params.taskId).populate('project');

        if (!task) {
            res.status(404).json("this task doesn't exist");
        }
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
const updateTaskStatus = async (req, res) => {
    try {

        const task = await Task.findById(req.params.taskId);
        if (task.status === 'todo')
            task.status = 'in-progress'
        else task.status = 'completed'

        await task.save()
        res.status(200).json(task);
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
module.exports = { createTask, index, show, updateTaskStatus, updateTask, deleteTask };