const express = require('express');
const joinRequestCtrl = require('../Controllers/joinRequestCtrl');

const router = express.Router({ mergeParams: true });

router.get('/', joinRequestCtrl.getProjectJoinRequests);
router.post('/', joinRequestCtrl.createJoinRequest);

module.exports = router;