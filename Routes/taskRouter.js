const express = require('express');
const taskCtrl = require('../Controllers/taskCtrl');
const router = express.Router({ mergeParams: true });

router.post('/', taskCtrl.createTask);
router.get('/:taskId', taskCtrl.getTask);


module.exports = router;