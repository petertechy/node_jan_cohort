const mongoose = require('mongoose')

let userSchema = mongoose.Schema({
    firstName: {type:String, required:true},
    lastName: {type:String, required:true},
    email: {type:String, required:true, unique:true},
    age: {type: Number, required:true},
    date_registered: {type: Date, default: Date.now()},
    password: {type: String, required: true}
})


let userModel = mongoose.model('registered_user', userSchema)

module.exports = userModel