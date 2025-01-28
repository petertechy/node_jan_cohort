const express = require('express')
const Router = express.Router()
const {createUser, fetchUsers} = require('../controllers/user.controller')

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

module.exports = Router