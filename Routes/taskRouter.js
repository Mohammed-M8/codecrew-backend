const express = require('express');
const taskCtrl = require('../Controllers/taskCtrl');
const { checkTaskOwner } = require('../Middleware/checkTaskOwner');
const { checkMembership } = require('../Middleware/checkMembership');
const router = express.Router({ mergeParams: true });

router.post('/', checkMembership, taskCtrl.createTask);
router.get('/', checkMembership, taskCtrl.index);
router.get('/:taskId', checkMembership, taskCtrl.show);
router.put('/:taskId', checkTaskOwner, taskCtrl.updateTask);
router.delete('/:taskId', checkTaskOwner, taskCtrl.deleteTask);



module.exports = router;