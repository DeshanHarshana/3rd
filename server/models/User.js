const mongoose=require('mongoose')
const Schema=mongoose.Schema

const userSchema =mongoose.Schema({
    email:String,
    password:String,
    emailVerified:Boolean,
    firstname:String,
    emailToken:String,
    profileImage:String,
    Age:Number,
    CoverImage:String,
    Posts:Number,
    Follows:Number,
    University: String,
    Title: String,
    About:String,
    City:String,
    Country:String,
    Address:String,
    PostalCode:String
})

module.exports=mongoose.model('user', userSchema, 'user')