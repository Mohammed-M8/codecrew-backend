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

const index=async (req,res)=>{
    try {
        const projects=await Project.find().populate(['owner','members'])
        res.status(200).json(projects)
    } catch (error) {
        console.log(error.message)
        res.status(500).json({err:error.message})

    }
}

module.exports={create,index}