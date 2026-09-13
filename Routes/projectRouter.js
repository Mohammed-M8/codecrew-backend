const projectCtrl=require('../Controllers/projectCtrl')
const isProjectOwner = require('../Middleware/isProjectOwner')
const isSignedIn=require('../Middleware/isSignedIn')
const express=require('express')
const router=express.Router({mergeParams:true})

router.post('/',isSignedIn,projectCtrl.create)
router.get('/',projectCtrl.index)
router.get('/:projectId',projectCtrl.show)
router.put('/:projectId',isSignedIn,isProjectOwner,projectCtrl.update)
router.delete('/:projectId',isSignedIn,isProjectOwner,projectCtrl.delete)
router.get('/:projectId/members',projectCtrl.getProjectMembers)
module.exports=router