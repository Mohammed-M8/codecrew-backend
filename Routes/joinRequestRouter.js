const express = require('express');

const joinRequestCtrl = require('../Controllers/joinRequestCtrl');
const isProjectOwner = require('../Middleware/isProjectOwner');
const router = express.Router({ mergeParams: true });

router.get('/', joinRequestCtrl.getProjectJoinRequests);
router.post('/', joinRequestCtrl.createJoinRequest);
router.patch('/:id', isProjectOwner, joinRequestCtrl.updateJoinRequest);

module.exports = router;