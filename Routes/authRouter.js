const ctrl = require('../Controllers/authCtrl')
const express = require('express');
const router = express.Router();
const isSignedIn=require('../Middleware/isSignedIn')

router.get('/sign-token', ctrl.signToken);
router.post('/verify-token', ctrl.verifyToken)
router.post('/sign-up',ctrl.signup)
router.post('/sign-in', ctrl.login)

module.exports = router;