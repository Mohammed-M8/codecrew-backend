const Project = require("../Models/project")
const Task = require("../Models/task")

const activity = async (req, res) => {
    try {
        const projects = await Project.find({ "members.user": req.user._id });
        const projectIds = projects.map((project) => project._id);
        const tasks = await Task.find({
            project: { $in: projectIds }
            , assignedTo: req.user._id,
            status: { $in: ['todo', 'in-progress'] }
        }).populate('project')
            .populate('assignedTo');
        res.status(200).json(tasks)

    }
    catch (err) {
        res.status(500).json(err.message)
    }
}

module.exports = { activity }