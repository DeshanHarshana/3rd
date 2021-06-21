const mongoose=require('mongoose')
const Schema=mongoose.Schema

const postSchema =mongoose.Schema({

    
    Content:String,
    Comments: [{
        commentid:Number,
        comment:String
      }]
})

module.exports=mongoose.model('comment', postSchema, 'comment')