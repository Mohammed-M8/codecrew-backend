const projectCtrl=require('../Controllers/projectCtrl')
const isSignedIn=require('../Middleware/isSignedIn')
const express=require('express')
const router=express.Router({mergeParams:true})

router.post('/',isSignedIn,projectCtrl.create)
router.get('/',projectCtrl.index)
router.get('/:id',projectCtrl.show)

module.exports=router