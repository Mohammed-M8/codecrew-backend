const express = require('express');
const joinRequestCtrl = require('../Controllers/joinRequestCtrl');
const isProjectOwner = require('../Middleware/isProjectOwner');
const isSignedIn = require('../Middleware/isSignedIn');
const router = express.Router({ mergeParams: true });

router.get('/', joinRequestCtrl.getProjectJoinRequests);
router.post('/', isSignedIn, joinRequestCtrl.createJoinRequest);
router.patch('/:id', isProjectOwner, joinRequestCtrl.updateJoinRequest);
router.delete('/:id', isSignedIn, joinRequestCtrl.cancelJoinRequest);

module.exports = router;