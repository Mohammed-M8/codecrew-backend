const JoinRequest = require('../Models/JoinRequest');
const Project = require('../Models/project');


const getProjectJoinRequests = async (req, res) => {
    try {
        const joinRequests = await JoinRequest.find({
            project: req.params.projectId
        });

        res.status(200).json(joinRequests);
    } catch (err) {
        res.status(500).json({ err: err.message });
    }
};


const getUserJoinRequests = async (req, res) => {
    try {
        const joinRequests = await JoinRequest.find({
            requestor: req.params.userId
        });

        res.status(200).json(joinRequests);
    } catch (err) {
        res.status(500).json({ err: err.message });
    }
};

const createJoinRequest = async (req, res) => {
    try {
        const newJoinRequest = await JoinRequest.create({
            project: req.params.projectId,
            requestor: req.user._id,
            role: req.body.role,
            message: req.body.message
        });

        res.status(201).json(newJoinRequest);
    } catch (err) {
        res.status(500).json({ err: err.message });
    }
};


const updateJoinRequest = async (req, res) => {
    try {
        const joinRequest = await JoinRequest.findById(req.params.id);

        if (!joinRequest) {
            return res.status(404).json({
                err: 'Join request not found'
            });
        }

        if (req.body.action === 'accept') {
            const project = await Project.findById(joinRequest.project);

            project.members.push({
                user: joinRequest.requestor,
                role: joinRequest.role
            });

            await project.save();
            await JoinRequest.findByIdAndDelete(req.params.id);

            return res.status(200).json({
                message: 'Join request accepted'
            });
        }

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
    getUserJoinRequests,
    createJoinRequest,
    updateJoinRequest,
    cancelJoinRequest,

};