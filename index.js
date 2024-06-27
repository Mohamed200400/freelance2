const mongoose = require("mongoose")
const express = require("express")
const cors = require("cors")
const user = require("./router/User")
const question = require("./router/Question")


const app = express()

mongoose.connect("mongodb+srv://mohamed:admin123@project1.sxosfwz.mongodb.net/project1").then(()=>{console.log('db connected')})

 //mongoose.connect("mongodb://0.0.0.0/Question").then(()=>{console.log('db connected');})
const conn = mongoose.Connection;


app.use(express.json())
app.use(cors())




app.use("/api",user)

app.use("/api",question)

app.listen(5000,()=>{
    console.log('server running');
})