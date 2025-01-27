const express = require('express')
const app = express()
const ejs = require('ejs')
const mongoose = require('mongoose')
app.use(express.urlencoded({extended:true}))
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

let userSchema = mongoose.Schema({
    firstName: {type:String, required:true},
    lastName: {type:String, required:true},
    email: {type:String, required:true},
    age: {type: Number, required:true},
    date_registered: {type: String, default: Date.now()},
    password: {type: String, required: true}
})


let userModel = mongoose.model('registered_user', userSchema)




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

app.get('/all-users', (req, res)=>{
    userModel.find()
    .then((users)=>{
        console.log(users)
        res.render("allUsers", {allUsers: users})
    })
  
})

app.post('/register', (req,res)=>{
    // console.log("It is working for register")
    let form = new userModel(req.body)
    form.save()
    .then(()=>{
        console.log("User Info saved successfully")
    })
    .catch((err)=>{
        console.log(err, "User Info not saved")
    })
    

    // console.log(req.body)
    // allUsers.push(req.body)
    // res.send("User Info Submitted")
    res.redirect('/all-users')
})

app.listen(PORT, ()=>{
    console.log("It is working")
})

//npm i -g nodemon