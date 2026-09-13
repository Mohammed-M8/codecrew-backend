const projectCtrl=require('../Controllers/projectCtrl')
const isProjectOwner = require('../Middleware/isProjectOwner')
const isSignedIn=require('../Middleware/isSignedIn')
const express=require('express')
const router=express.Router({mergeParams:true})

router.post('/',isSignedIn,projectCtrl.create)
router.get('/',projectCtrl.index)
router.get('/:id',projectCtrl.show)
router.put('/:id',isSignedIn,isProjectOwner,projectCtrl.update)
router.delete('/:id',isSignedIn,isProjectOwner,projectCtrl.delete)
router.get('/:id/members',projectCtrl.getProjectMembers)
module.exports=router