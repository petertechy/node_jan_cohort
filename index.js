const express = require('express')
const app = express()
const ejs = require('ejs')
const mongoose = require('mongoose')
const userRoute = require('./routes/user.route')
app.use(express.urlencoded({extended:true}))
app.use('/user', userRoute)
app.set("view engine", "ejs")

const URI = "mongodb+srv://ikolabaolanrewaju:olanrewaju09@cluster0.3jaoi.mongodb.net/user_info?retryWrites=true&w=majority&appName=Cluster0"

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

// let allUsers = []

let studentArray = [
    {firstname: "Esther", lastname: "SQI", age: 20, isMarried: true},
    {firstname: "Heritage", lastname: "SQI", age: 24, isMarried: false},
    {firstname: "Samuel", lastname: "SQI", age: 20, isMarried: true},
    {firstname: "Michael", lastname: "SQI", age: 20, isMarried: false},
    {firstname: "Fresh", lastname: "SQI", age: 20, isMarried: false},
    {firstname: "Tolu", lastname: "SQI", age: 20, isMarried: true}, 
]

app.listen(PORT, ()=>{
    console.log("It is working")
})

//npm i -g nodemon