const express = require('express');
const taskCtrl = require('../Controllers/taskCtrl');
const router = express.Router({ mergeParams: true });

router.post('/', taskCtrl.createTask);

module.exports = router;