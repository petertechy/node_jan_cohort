const express = require('express')
const Router = express.Router()
const {createUser, fetchUsers, deleteUser, updateUser, signInUser, getdashboard, uploadFile} = require('../controllers/user.controller')

Router.get('/', (req, res)=>{
    // res.send("Welcome to Node class")
    // res.send(studentArray)
    // res.sendFile(__dirname + '/index.html')
    // console.log(__dirname)
    //templating engine

    res.render("index")
    
})

Router.get('/sign-up', (req, res)=>{
    res.render("signup")
})
Router.get('/dashboard', (req, res)=>{
    res.render("dashboard", {name: "Tolu", gender: "male", allUsers})
})
Router.get('/all-users', fetchUsers)
Router.post('/register', createUser)
Router.post("/delete/:id",deleteUser);
Router.post("/edit/:id", updateUser)
Router.post('/signin', signInUser)
Router.get('/getdashboard', getdashboard)
Router.post('/upload', uploadFile)

module.exports = Router