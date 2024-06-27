const mongoose = require("mongoose")
const express = require("express")
const cors = require("cors")
const user = require("./router/User")
const question = require("./router/Question")
const path = require('path');

const app = express()

mongoose.connect("mongodb+srv://mohamed:admin123@project1.sxosfwz.mongodb.net/project1").then(()=>{console.log('db connected')})

 //mongoose.connect("mongodb://0.0.0.0/Question").then(()=>{console.log('db connected');})
const conn = mongoose.Connection;


app.use(express.json())
app.use(cors())

// Serve static files from the dist folder
app.use(express.static(path.join(__dirname, '../dist')));

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});


app.use("/api",user)

app.use("/api",question)

app.listen(5000,()=>{
    console.log('server running');
})