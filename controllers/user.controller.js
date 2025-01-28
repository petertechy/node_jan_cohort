const express = require('express')
const userModel = require('../models/users.model')
const createUser = (req, res) =>{
    let form = new userModel(req.body)
    form.save()
    .then(()=>{
        console.log("User Info saved successfully")
    })
    .catch((err)=>{
        console.log(err, "User Info not saved")
    })
    res.redirect('/user/all-users')
}

const fetchUsers = (req, res) =>{
    userModel.find()
    .then((users)=>{
        console.log(users)
        res.render("allUsers", {allUsers: users})
    })
}

const signInUser = (req, res) =>{

}



module.exports = {createUser, signInUser, fetchUsers}