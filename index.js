const mongoose = require("mongoose")
const express = require("express")
const cors = require("cors")
const user = require("./router/User")
const question = require("./router/Question")
require("dotenv").config()
const nodemailer = require('nodemailer');


const app = express()

mongoose.connect(process.env.DB_CODE).then(()=>{console.log('db connected')})

//mongoose.connect("mongodb://0.0.0.0/Question").then(()=>{console.log('db connected');})
const conn = mongoose.Connection;


app.use(express.json())
app.use(cors())




app.use("/api",user)

app.use("/api",question)


const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

app.post('/send-email', (req, res) => {
    const { to, subject, text } = req.body;

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: to,
        subject: subject,
        text: text,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send(error.toString());
        }
        res.status(200).send('Email sent: ' + info.response);
    });
});



app.listen(5000,()=>{
    console.log('server running');
})