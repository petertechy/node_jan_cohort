const express = require('express')
const app = express()
const ejs = require('ejs')
app.use(express.urlencoded({extended:true}))
app.set("view engine", "ejs")


const PORT = 5500

let allUsers = []

let studentArray = [
    {firstname: "Esther", lastname: "SQI", age: 20, isMarried: true},
    {firstname: "Heritage", lastname: "SQI", age: 24, isMarried: false},
    {firstname: "Samuel", lastname: "SQI", age: 20, isMarried: true},
    {firstname: "Michael", lastname: "SQI", age: 20, isMarried: false},
    {firstname: "Fresh", lastname: "SQI", age: 20, isMarried: false},
    {firstname: "Tolu", lastname: "SQI", age: 20, isMarried: true}, 
]

app.get('/', (req, res)=>{
    // res.send("Welcome to Node class")
    // res.send(studentArray)
    // res.sendFile(__dirname + '/index.html')
    // console.log(__dirname)
    //templating engine

    res.render("index")
    
})

app.get('/sign-up', (req, res)=>{
    res.render("signup")
})
app.get('/dashboard', (req, res)=>{
    res.render("dashboard", {name: "Tolu", gender: "male", allUsers})
})

app.post('/register', (req,res)=>{
    // console.log("It is working for register")
    console.log(req.body)
    allUsers.push(req.body)
    res.send("User Info Submitted")
})

app.listen(PORT, ()=>{
    console.log("It is working")
})

//npm i -g nodemon