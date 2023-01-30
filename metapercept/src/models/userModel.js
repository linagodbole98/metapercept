const mongoose = require("mongoose")

//Name, Email, Password, Confirm Password, Verification status = false
const Users = new mongoose.Schema({
Name:{
    type:String
},
Email:{
    type:String
},
Password:{
    type:String
},
ConfirmPassword:{
    type:String
},
['Verification status']:{
    type:Boolean,
    default:false
}
})

module.exports = mongoose.model("users", Users)