const Task = require("../Models/task")

const checkTaskOwner = async (req, res, next) => {
    const task = await Task.findById(req.params.taskId);
    if (!task.createdBy.equals(req.user._id)) {
        res.status(403).json('You are not authorized to modify this task')
    }
    next();
}
module.exports = { checkTaskOwner }
