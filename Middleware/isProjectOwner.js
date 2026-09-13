const Project = require('../Models/project')
const isProjectOwner = async (req, res, next) => {
    try {
        const project = await Project.findById(req.params.projectId)

        if (!project) return res.status(404).json({ err: "Project not found" });

        if (project.owner.toString() !== req.user._id.toString()) {
            return res.status(403).json({ err: "Not authorized" });
        }

        next();
    } catch (error) {
        console.log(error)
        res.status(500).json({ err: error.message })
    }
}

module.exports=isProjectOwner