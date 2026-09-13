const JoinRequest = require('../Models/JoinRequest');


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


module.exports = {
    getProjectJoinRequests,
    getUserJoinRequests,
};