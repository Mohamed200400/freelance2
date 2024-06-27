const express = require("express");
const User = require("../model/user")
const router = express.Router()
const mongoose = require("mongoose")



// register
router.route("/register").post(async (req ,res)=>{

    
    const user = await new User({
        name:req.body.name,
        password:req.body.password,
        email:req.body.email,
        gender : req.body.gender,
        age : req.body.age
    })
    try{
        await user.save()
       
        const {_id,name,email,isAdmin}=user 
      

        res.status(201).json({_id,name,email,isAdmin})
    }catch(error){
        res.status(500).json({message:error.message})
    }
 })
// login 
router.route("/login").post(async (req ,res)=>{

    const user = await User.find({email : req.body.email})
    const password = req.body.password
    
    try{
        const {_id,name,email,isAdmin}=user[0]
        

        if (user.length>0 && await user[0].password === password  ){
            
            
            res.status(200).json({_id,name,email,isAdmin})
        }else {
            res.status(404).json("البريد أو كلمة المرور خاطئة")
        }
   
       
    }catch(error){
        res.status(500).json({message:error.massage})
    }

 })
// find user by email
router.route("/user").post(async (req ,res)=>{

    try{
        const email = req.body.email
        const user = await User.find({email : email})
        res.status(201).json(user)
    }catch(error){
        res.status(500).json({message:error.message})
    }



// get user length
 }).get(async (req ,res)=>{

    try{
        
        const user = await User.find({})
        res.status(201).json({
            user ,
            length : user.length})
    }catch(error){
        res.status(500).json({message:error.message})
    }
 })

// get male gender
router.route("/user/male").get(async (req ,res)=>{

    try{

        const user = await User.find({gender : "ذكر"})
        res.status(201).json({length : user.length})
    }catch(error){
        res.status(500).json({message:error.message})
    }
 })


// find by email and add the result
 router.route("/user/res").put(async (req ,res)=>{

    try{
        const email = req.body.email
        const result = req.body.result
        const user = await User.findOneAndUpdate({email : email },{ result : result},{new : true })
        res.status(201).json(user)
    }catch(error){
        res.status(500).json({message:error.message})
    }
 })

 // get by age 
router.route("/user/:age").get(async (req ,res)=>{

    try{
        const age = req.params.age
        const user = await User.find({age : age })
        res.status(201).json({length : user.length})
    }catch(error){
        res.status(500).json({message:error.message})
    }
 })




 module.exports = router ;