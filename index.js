//dotenv, deployment, api testing, email sending

const express = require('express')
const app = express()
const ejs = require('ejs')
const dotenv = require("dotenv")
dotenv.config()
const mongoose = require('mongoose')
const userRoute = require('./routes/user.route')
app.use(express.urlencoded({extended:true}))
app.use('/user', userRoute)
app.set("view engine", "ejs")
const URI = process.env.MONGO_DB_URI
//environment variable
//URI - Uniform Resource Identifier
//connect to mongodb
mongoose.connect(URI)
.then(()=>{
     console.log("Mongodb has started successfully")
})
.catch((err)=>{
    console.log("This is an error ", err)
})
const PORT = 5500
app.listen(PORT, ()=>{
    console.log("It is working")
})