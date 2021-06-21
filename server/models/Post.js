const mongoose=require('mongoose')
const Schema=mongoose.Schema

const postSchema =mongoose.Schema({

    Uid:String,
    Title:String,
    PostImage:String,
    Date:String,
    Content:String,
    Comments: [{
      Userid:String,
      Comment:String,
      Date:String,
      Uname:String,
      ProfileImage:String
      

    }]
})

module.exports=mongoose.model('post', postSchema, 'post')