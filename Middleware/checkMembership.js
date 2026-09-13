const Task = require("../Models/project")

const checkMembership = async (req, res, next) => {
    const project = await Task.findById(req.params.projectId);
    if (!project.members.user._id.contains(req.user._id)) {
        res.status(403).json('You are not authorized to be in this project')
    }
    next();
}
module.exports = { checkMembership }