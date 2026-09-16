const Project = require("../Models/project")
const Task = require("../Models/task")
const User=require("../Models/user")
const activity = async (req, res) => {
    try {
        const projects = await Project.find({ "members.user": req.user._id });
        const projectIds = projects.map((project) => project._id);
        const tasks = await Task.find({
            project: { $in: projectIds }
            , assignedTo: req.user._id,
            status: { $in: ['todo', 'in-progress'] }
        }).populate('project')
            .populate('assignedTo')
            .sort({ dueDate: 1 });
        res.status(200).json(tasks)

    }
    catch (err) {
        res.status(500).json(err.message)
    }
}

const getUserInfo = async (req, res) => {
    try {
        const { userId } = req.params;

        const userInfo = await User.findById(userId)
        if (!userInfo) return res.status(404).json({ err: "User not found" });

        const ownedCount = await Project.countDocuments({ owner: userId });
        const memberCount = await Project.countDocuments({ 'members.user': userId });

        res.status(200).json({
            user: userInfo,
            stats: {
                ownedProjects: ownedCount,
                memberProjects: memberCount
            }
        });
    } catch (err) {
        if (err.name === 'CastError') {
            return res.status(404).json({ err: "User not found" });
        }
        res.status(500).json({ err: err.message })
    }
}

module.exports = { activity, getUserInfo }