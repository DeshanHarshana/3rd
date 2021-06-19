const mongoose=require('mongoose')
const Schema=mongoose.Schema

const postSchema =mongoose.Schema({

    Uid:String,
    Title:String,
    PostImage:String,
    Date:String,
    Content:String
})

module.exports=mongoose.model('post', postSchema, 'post')