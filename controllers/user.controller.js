const userModel = require('../models/users.model')
const nodemailer = require('nodemailer')
const createUser = (req, res) =>{
    let form = new userModel(req.body)
    form.save()
    .then(()=>{
      console.log("User Info saved successfully")
      console.log(req.body)
      res.send({message: "Successfully registered", form})

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
        res.status(500).send({ error: err.message });
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



module.exports = {createUser, signInUser, fetchUsers, deleteUser, updateUser}