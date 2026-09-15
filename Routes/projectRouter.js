const projectCtrl=require('../Controllers/projectCtrl')
const joinRequestCtrl=require('../Controllers/joinRequestCtrl')
const isProjectOwner = require('../Middleware/isProjectOwner')
const isSignedIn=require('../Middleware/isSignedIn')
const express=require('express')
const router=express.Router({mergeParams:true})

router.post('/',isSignedIn,projectCtrl.create)
router.get('/',projectCtrl.index)
router.get('/me',isSignedIn,projectCtrl.getUsersProjects)
router.get('/join-requests',isSignedIn,joinRequestCtrl.getOwnerJoinRequests)
router.get('/my-join-requests',isSignedIn,joinRequestCtrl.getUserJoinRequests)
router.get('/:projectId',projectCtrl.show)
router.put('/:projectId',isSignedIn,isProjectOwner,projectCtrl.update)
router.delete('/:projectId',isSignedIn,isProjectOwner,projectCtrl.delete)
router.get('/:projectId/members',projectCtrl.getProjectMembers)
router.delete('/:projectId/members/:memberId',isSignedIn,isProjectOwner,projectCtrl.deleteMember)

module.exports=router