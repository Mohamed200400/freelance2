const express = require("express");
const Question = require("../model/question")
const router = express.Router()
const mongoose = require("mongoose")



// add question
router.route("/question").post(async (req ,res)=>{
    const question = await new Question({
        question : req.body.question,
        category : req.body.category,
        type : req.body.type
    })
    try{
        await question.save()

        res.status(201).json(question)
    }catch(error){
        res.status(500).json({message:error.message})
    }

// get all the question
 }).get(async (req ,res)=>{
    
    try{
        const question = await Question.find()

        res.status(200).json(question)
    }catch(error){
        res.status(500).json({message:error.message})
    }
 })
 // delete one question
 router.route("/question/:id").delete(async (req ,res)=>{
    
    try{
        const id = req.params.id
        const question = await Question.findByIdAndDelete(id)
        res.status(200).json(question)
    }catch(error){
        res.status(500).json({message:error.message})
    }


 })
 // get with the same category
 router.route("/question/:cat").get(async (req ,res)=>{
    
    try{
        const cat = req.params.cat
        const question = await Question.find({category : cat})
        res.status(200).json(question)
    }catch(error){
        res.status(500).json({message:error.message})
    }


 })
 // get with the same category length
 router.route("/question/:cat/length").get(async (req ,res)=>{
    
    try{
        const cat = req.params.cat
        const question = await Question.find({category : cat})
        res.status(200).json({length : question.length})
    }catch(error){
        res.status(500).json({message:error.message})
    }


 })



 module.exports = router ;