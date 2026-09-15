const Project = require('../Models/project')



const create = async (req, res) => {

    try {

        req.body.owner = req.user._id;
        if (!req.body.requiredRoles || req.body.requiredRoles.length === 0) {
            return res.status(400).json({ err: 'At least one required role is needed.' });
        }
        if (!req.body.technologies || req.body.technologies.length === 0) {
            return res.status(400).json({ err: 'At least one technology is required' })
        }
        const project = await Project.create(req.body)

        res.status(201).json(project)

    } catch (error) {

        console.log(error.message)

        res.status(500).json({ err: error.message })

    }

}

const index = async (req, res) => {
    try {
        const {search}=req.query;
        let query = { status: "open" };

        if (search) {
            query.title = {
                $regex: search,
                $options: 'i'
            };
        }
        const projects = await Project.find(query).populate(['owner', 'members.user'])
        res.status(200).json(projects)
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ err: error.message })

    }
}

const getUsersProjects = async (req, res) => {
    try {
        const projects = await Project.find({
            $or: [
                { owner: req.user._id }, { 'members.user': req.user._id }
            ]
        }).populate(['owner', 'members.user'])

        res.status(200).json(projects)
    } catch (error) {
        console.log(error)
        res.status(500).json({ err: error.message })
    }
}

const show = async (req, res) => {
    try {
        const project = await Project.findById(req.params.projectId).populate(['owner', 'members.user'])
        if (!project) return res.status(404).json({ err: "Project not found" })
        res.status(200).json(project)
    } catch (error) {
        console.log(error)
        res.status(500).json({ err: error.message })
    }
}

const update = async (req, res) => {
    try {
        const { title, description, technologies, requiredRoles, status } = req.body;

        const project = await Project.findByIdAndUpdate(
            req.params.projectId,
            { title, description, technologies, requiredRoles, status },
            { new: true, runValidators: true }
        );
        if (!project) return res.status(404).json({ err: "Project not found" })
        res.status(200).json(project)
    } catch (error) {
        console.log(error)
        res.status(500).json({ err: error.message })
    }
}

const deleteProject = async (req, res) => {
    try {
        const project = await Project.findByIdAndDelete(req.params.projectId);
        if (!project) return res.status(404).json({ err: "Project not found" });
        res.status(204).end();
    } catch (error) {
        console.log(error);
        res.status(500).json({ err: error.message });
    }
};

const getProjectMembers = async (req, res) => {
    try {
        const project = await Project.findById(req.params.projectId).populate('members.user')
        if (!project) return res.status(404).json({ err: "Project not found" })
        const members = project.members;
        res.status(200).json(members)
    } catch (error) {
        console.log(error)
        res.status(500).json({ err: error.message })
    }
}

const deleteMember = async (req, res) => {
    try {
        const project = await Project.findById(req.params.projectId);
        if (!project) return res.status(404).json({ err: "Project not found" });

        project.members = project.members.filter(
            m => m.user.toString() !== req.params.memberId
        );

        await project.save();

        res.status(204).end();
    } catch (error) {
        console.log(error);
        res.status(500).json({ err: error.message });
    }
};
module.exports = { create, index, show, update, delete: deleteProject, getProjectMembers, deleteMember, getUsersProjects }