const userModel = require('../models/users.model')
const nodemailer = require('nodemailer')
const jwt = require('jsonwebtoken')
const createUser = (req, res) =>{
    let form = new userModel(req.body)
    form.save()
    .then(()=>{
      console.log("User Info saved successfully")
      console.log(form)
      res.send({message: "Successfully registered", status: true})

        // var transporter = nodemailer.createTransport({
        //     service: 'gmail',
        //     auth: {
        //       user: process.env.GMAIL_USER,
        //       pass: process.env.GMAIL_PASS
        //     }
        //   });
          
        //   var mailOptions = {
        //     from: 'petertechy01@gmail.com',
        //     to: [req.body.email, 'ihezuechigozie@gmail.com', 'adeyemipraise97@gmail.com',"ikolabaolanrewaju@gmail.com"],
        //     subject: 'Welcome to Our Node Application',
        //     html: '<h1>Congratulations!!!</h1><p>You are welcome to our Node Application</p>'
        //   };
          
        //   transporter.sendMail(mailOptions, function(error, info){
        //     if (error) {
        //       console.log(error);
        //     } else {
        //       console.log('Email sent: ' + info.response);
        //     }
        //   });

        // res.redirect('/user/all-users')
    })
    .catch((err)=>{
        console.log(err, "User Info not saved")
        res.send({ error: err.message, status: false, message: "Invalid Response" });
    })
}

const fetchUsers = (req, res) =>{
    userModel.find()
    .then((users)=>{
        console.log(users)
        // res.send({status: true, users})
        res.render("allUsers", {allUsers: users})
    })
    .catch((err) => {
      console.error("Error fetching users:", err);
      res.status(500).send({ error: err.message });
  });
}

const signInUser = (req, res) =>{
  console.log(req.body)
  let {password} = req.body
  userModel.findOne({email: req.body.email})
  .then((user)=>{
    // console.log(response)
    if(user){
      // res.send({status:true, message: "right credentials"})
      // console.log(user)
      user.validatePassword(password, (err, same)=>{
        // console.log(password)
        // console.log(same)
        if(!same){
          res.send({status: false, message: "Wrong Credential"})
        }else{
          let token = jwt.sign({email: req.body.email}, "secret", {expiresIn:"1h"})
          console.log(token)
          res.send({status: true, message: "Right Credential", token})
        }
      })

    }else{
      console.log("Invalid Email")
      res.send({status:false, message: "wrong credentials"})
    }
  })
  .catch((err)=>{
    console.log("error is happening", err)
  })
}

const deleteUser = async (req, res)=>{
  try {
    const { id } = req.params;

    const deletedUser = await userModel.findByIdAndDelete(id);
    if (!deletedUser) return res.status(404).send("User not found");

    res.redirect("/user/all-users");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
  
}

const updateUser = async (req, res)=>{
  try {
    const { id } = req.params;
    const { firstName, lastName, email, age } = req.body;

    const updatedUser = await userModel.findByIdAndUpdate(
      id,
      { firstName, lastName, email, age },
      { new: true }
    );

    if (!updatedUser) return res.status(404).send("User not found");

    res.redirect("/user/all-users");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
  
}

const getdashboard = (req, res) =>{
  // console.log(res)
  let token = req.headers.authorization.split(' ')[1]
  jwt.verify(token, "secret", (err, result)=>{
    if(err){
      // console.log(err)
      res.send({status: false, message: "Invalid token or expired"})
    }else{
      // console.log(result)
      res.send({status: true, message: "token is valid"})

    }
  })
  // console.log(token)
}



module.exports = {createUser, signInUser, fetchUsers, deleteUser, updateUser, getdashboard}