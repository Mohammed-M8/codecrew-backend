const Project = require("../Models/project");

const checkMembership = async (req, res, next) => {
    const project = await Project.findById(req.params.projectId);

    const isMember = project.members.some((member) =>
        member.user.toString() === req.user._id)

    if (!isMember) {
        res.status(403).json('You are not authorized to be in this project')
    }
    next();
}
module.exports = { checkMembership }