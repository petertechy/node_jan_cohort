//dotenv, deployment, api testing, email sending

//thunder client, postman, swagger, insomia
const express = require('express')
const app = express()
const ejs = require('ejs')
const dotenv = require("dotenv")
const cors = require("cors")
dotenv.config()
const mongoose = require('mongoose')
const userRoute = require('./routes/user.route')
app.use(express.urlencoded({extended:true}))
app.use(cors())
app.use(express.json())
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
    console.log("It is working on port" + PORT)
})