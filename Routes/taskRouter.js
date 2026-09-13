const express = require('express');
const taskCtrl = require('../Controllers/taskCtrl');
const { checkTaskOwner } = require('../Middleware/checkTaskOwner');
const router = express.Router({ mergeParams: true });

router.post('/', taskCtrl.createTask);
router.get('/', taskCtrl.index);
router.get('/:taskId', taskCtrl.show);
router.put('/:taskId', checkTaskOwner, taskCtrl.updateTask);


module.exports = router;