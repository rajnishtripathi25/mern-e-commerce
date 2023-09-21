const mongoose = require('mongoose')

const UserSchema =  new mongoose.Schema({
    name:{
        type:String,
        require:true 
    },
    email:{
        type:String,
        unique:true, 
        required:true 
    },
    password:{
        type:String ,
        required:true ,
    },
    confirm_password :{
        type:String,
        required:true 
    }
})

const User =  new mongoose.model("User",UserSchema)

module.exports = User 