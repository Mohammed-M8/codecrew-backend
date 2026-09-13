const Project = require('../Models/project')



const create = async (req, res) => {

    try {

        req.body.owner = req.user;

        const project = await Project.create(req.body)

        res.status(201).json(project)

    } catch (error) {

        console.log(error.message)

        res.status(500).json({ err: error.message })

    }

}

const index = async (req, res) => {
    try {
        const projects = await Project.find().populate(['owner', 'members'])
        res.status(200).json(projects)
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ err: error.message })

    }
}

const show = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id).populate(['owner', 'members'])
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
            req.params.id,
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

module.exports = { create, index, show, update }