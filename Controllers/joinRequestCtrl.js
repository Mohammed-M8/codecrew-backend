const JoinRequest = require('../Models/JoinRequest');
const Project = require('../Models/project');


// Get all join requests for one project
const getProjectJoinRequests = async (req, res) => {
    try {
        const joinRequests = await JoinRequest.find({
            project: req.params.projectId
        }).populate('requestor', 'username');

        res.status(200).json(joinRequests);
    } catch (err) {
        res.status(500).json({ err: err.message });
    }
};


// Get all join requests for projects owned by the logged-in user
const getOwnerJoinRequests = async (req, res) => {
    try {
        const projects = await Project.find({
            owner: req.user._id
        });

        const projectIds = projects.map((project) => project._id);

        const joinRequests = await JoinRequest.find({
            project: { $in: projectIds }
        })
            .populate('requestor', 'username')
            .populate('project', 'title');

        res.status(200).json(joinRequests);
    } catch (err) {
        res.status(500).json({ err: err.message });
    }
};


// Get all join requests made by one user
const getUserJoinRequests = async (req, res) => {
    try {
        const joinRequests = await JoinRequest.find({
            requestor: req.user._id
        }).populate('project', 'title');;

        res.status(200).json(joinRequests);
    } catch (err) {
        res.status(500).json({ err: err.message });
    }
};


const createJoinRequest = async (req, res) => {
    try {
        // Find the project
        const project = await Project.findById(req.params.projectId);

        // Check if project exists
        if (!project) {
            return res.status(404).json({
                err: 'Project not found'
            });
        }

        // Prevent the owner from joining their own project
        if (project.owner.toString() === req.user._id.toString()) {
            return res.status(400).json({
                err: 'You cannot join your own project'
            });
        }

        // Check if the user is already a member
        const isMember = project.members.some(
            (member) => member.user.toString() === req.user._id.toString()
        );

        if (isMember) {
            return res.status(400).json({
                err: 'You are already a member of this project'
            });
        }

        // Check if the user already sent a join request
        const existingRequest = await JoinRequest.findOne({
            project: req.params.projectId,
            requestor: req.user._id
        });

        if (existingRequest) {
            return res.status(400).json({
                err: 'You already sent a join request'
            });
        }

        // Create the join request
        const newJoinRequest = await JoinRequest.create({
            project: req.params.projectId,
            requestor: req.user._id,
            role: req.body.role,
            message: req.body.message
        });

        res.status(201).json(newJoinRequest);

    } catch (err) {
        res.status(500).json({
            err: err.message
        });
    }
};


// Accept or reject a join request
const updateJoinRequest = async (req, res) => {
    try {
        const joinRequest = await JoinRequest.findById(req.params.id);

        if (!joinRequest) {
            return res.status(404).json({
                err: 'Join request not found'
            });
        }

        // Accept request
        if (req.body.action === 'accept') {
            const project = await Project.findById(joinRequest.project);

            if (!project) {
                return res.status(404).json({
                    err: 'Project not found'
                });
            }

            project.members.push({
                user: joinRequest.requestor,
                role: joinRequest.role
            });

            await project.save();

            // Delete request after accepting
            await JoinRequest.findByIdAndDelete(req.params.id);

            return res.status(200).json({
                message: 'Join request accepted'
            });
        }

        // Reject request
        if (req.body.action === 'reject') {
            await JoinRequest.findByIdAndDelete(req.params.id);

            return res.status(200).json({
                message: 'Join request rejected'
            });
        }

        res.status(400).json({
            err: 'Action must be accept or reject'
        });

    } catch (err) {
        res.status(500).json({ err: err.message });
    }
};


// Cancel or withdraw a join request
const cancelJoinRequest = async (req, res) => {
    try {
        const joinRequest = await JoinRequest.findById(req.params.id);

        if (!joinRequest) {
            return res.status(404).json({
                err: 'Join request not found'
            });
        }

        await JoinRequest.findByIdAndDelete(req.params.id);

        res.status(200).json({
            message: 'Join request cancelled'
        });

    } catch (err) {
        res.status(500).json({ err: err.message });
    }
};


module.exports = {
    getProjectJoinRequests,
    getOwnerJoinRequests,
    getUserJoinRequests,
    createJoinRequest,
    updateJoinRequest,
    cancelJoinRequest,
};