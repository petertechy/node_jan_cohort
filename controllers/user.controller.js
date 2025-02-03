const userModel = require('../models/users.model')
const nodemailer = require('nodemailer')
const createUser = (req, res) =>{
    let form = new userModel(req.body)
    form.save()
    .then(()=>{
        console.log("User Info saved successfully")

        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'petertechy01@gmail.com',
              pass: 'vzrk ilmj zvur wmme'
            }
          });
          
          var mailOptions = {
            from: 'petertechy01@gmail.com',
            to: [req.body.email, 'ihezuechigozie@gmail.com', 'adeyemipraise97@gmail.com',"ikolabaolanrewaju@gmail.com"],
            subject: 'Welcome to Our Node Application',
            html: '<h1>Congratulations!!!</h1><p>You are welcome to our Node Application</p>'
          };
          
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });

        res.redirect('/user/all-users')
    })
    .catch((err)=>{
        console.log(err, "User Info not saved")
    })
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