const express = require('express');
const userCtrl = require('../Controllers/userCtrl');
const router = express.Router({ mergeParams: true });
router.get('',userCtrl.getUserInfo)
router.get('/activity', userCtrl.activity);

module.exports = router;
