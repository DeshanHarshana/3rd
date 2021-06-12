const mongoose=require('mongoose')
const Schema=mongoose.Schema

const userSchema =mongoose.Schema({
    email:String,
    password:String,
    emailVerified:Boolean,
    data:{
        firstname:String,
       
        emailToken:String
    }
})

module.exports=mongoose.model('user', userSchema, 'user')