const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
let userSchema = mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  age: { type: Number, required: true },
  date_registered: { type: Date, default: Date.now() },
  password: { type: String, required: true },
});

let saltRound = 10;

userSchema.pre("save", function (next) {
  bcrypt.hash(this.password, saltRound, (err, hashedPassword) => {
    // console.log(this.password);
    // console.log(hashedPassword)
    if(err){
        console.log(err, "There is an error")
    }else{
        this.password = hashedPassword
        console.log(this.password)
        next()
    }
  });
});

userSchema.methods.validatePassword = function (password, callback){
  console.log(password, this.password)
  bcrypt.compare(password, this.password, (err, same)=>{
    if(!err){
      console.log(same)
      callback(err, same)
    }else{
      next()
    }
  })
}



let userModel = mongoose.model("registered_user", userSchema);

module.exports = userModel;
