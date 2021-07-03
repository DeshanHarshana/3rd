const express=require('express')
const router=express.Router();

const mongoose=require('mongoose');
const User = require('../models/User');
const Post = require('../models/Post');
const Comment=require('../models/Comments')
const jwt=require('jsonwebtoken');


const db="mongodb+srv://deshan:deshan2233@cluster0.4ynst.mongodb.net/3rd?retryWrites=true&w=majority";
const mailgun = require("mailgun-js");
const DOMAIN = 'sandboxc32dc6a915c7493eb5f539e8c8129919.mailgun.org';
const mg = mailgun({apiKey: '4ca8a4335b4d7f733f49be26c745dc3d-90ac0eb7-d26ba9a2', domain: DOMAIN});
var oldProfileLink="";
var currentPostimage="";
mongoose.connect(db, {useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,}, err=>{
    if(err){
        console.log('Error' + err)
    }
    else{
        console.log('Mongo db ok')
    }
})

function verifyToken(req,res,next){
    if(!req.headers.authorization){
        return res.status(401).send("Unauthorized request")
    }
    let token = req.headers.authorization.split(' ')[1];
    console.log(token);
    if(token===null){
        return res.status(401).send("Unauthorized request")
    }
    try {
        let payload = jwt.verify (token, 'deshan')
        req.userId = payload.subject
        next ()

    } catch (err) {
        return res.status (401) .send ('Unauthorized request')

    }
}



router.put('/deletecomment', function(req, res){
    Post.findOneAndUpdate(
        {
            _id:req.body.postid,
        },
        {
            $pull:{
                Comments:{
                    _id:req.body.commentid
                }
            }
        },
        
        
           
          function(err,Userdata){
            if(err){
              res.send("Error updation userdata");
            }else{
            
            console.log("update success " )
            res.send(Userdata)
            }
          
    
    })
});

router.post('/addpost', function(req,res){
    console.log("Update User Data");
      
                    let postData={
                        Uid:req.body.Uid,
                        Title:req.body.Title,
                        Owner:req.body.Owner,
                        PostImage:'https://img.traveltriangle.com/blog/wp-content/uploads/2019/07/Kyoto-Waterfalls-cover.jpg',
                        Date:req.body.Date,
                        Category:req.body.Category,
                        Content:req.body.Content,
                        Comments:[]
                    }
                
                    let post=new Post(postData)
                    post.save((error,post)=>{
                        if(error){
                            console.log(error);
                        }
                        else{
                            res.status(200).send(post);
                        }
                    });
                    
                    
     
});


router.post('/addcomment', function(req,res){
    
      
                    let postData={
                        Comments:req.body.Comments
                    }
                
                    let post=new Comment(postData)
                    post.save((error,post)=>{
                        if(error){
                            console.log(error);
                        }
                        else{
                            res.status(200).send(post);
                        }
                    });
                    
                    
     
});
router.get('/getAllPost', function(req,res){
    Post.find({}, function(err, result){
        if(err){
            console.log(err);
        }else{
            res.json(result);
        }
    });
});

router.get('/getSpecificPost/:name', function(req, res){
    Post.find({Category: req.params.name}, function(err, result){
        if(err){
            console.log(err);
        }else{
            res.json(result);
        }
    })
})
router.get('/getPosts/:id', function(req,res){
    Post.find({Uid:req.params.id}, function(err, result){
        if(err){
            console.log(err);
        }else{
            res.json(result);
        }
    });
});
router.get('/getPost/:id', function(req,res){
    Post.findOne({_id:req.params.id}, function(err, result){
        if(err){
            console.log(err);
        }else{
            res.json(result);
            currentPostimage= result.PostImage.split("/")[5];
            console.log(currentPostimage);
        }
    })
})

router.get('/', function(req,res){
    res.send('From api route!');
})

router.post('/register',function(req,res){
    //let = req.body
    //let userData2 = req.body.firstname
    User.findOne({email:req.body.email},(err,user)=>{
        if(err){
            console.log(err)
        }
        else{
            if(user){
                console.log("exist");
                res.send({'exist':'yes'})
            }else{
                let userData={
                    email:req.body.email,
                    password:req.body.password,
                    emailVerified:true,
                    firstname:req.body.firstname,
                    emailToken:'',
                    profileImage:'https://i.pinimg.com/236x/65/25/a0/6525a08f1df98a2e3a545fe2ace4be47.jpg',
                    CoverImage:'',
                    Age:0,
                    Posts:0,
                    Follows:0,
                    University: '',
                    Title:'',
                    About:'',
                    City:'',
                    Country:'',
                    Address:'',
                    PostalCode:''
                }
                
                let user=new User(userData)
                user.save((error,regUser)=>{
                    if(error){
                        console.log(error);
                    }
                    else{
                        let payload={ subject : regUser._id}
                        let token=jwt.sign(payload, 'deshan')
                        res.status(200).send({token})
                        console.log(regUser.email);
                        const data = {
                            from: 'noreply@hello.com',
                            to: regUser.email,
                            subject: 'Hello',
                            html:`
                            <html>
                            <body>
                                <h2>please click on given link</h2>
                                
                                <p>http://localhost:3000/email-verify/${token}</p>
                            
                                </body>
                            </html>
                            `
                        };

                        mg.messages().send(data, function (error, body) {
                            if(error){
                               
                            }
                            else{
                                
                            }
                        });
                        
                    }
                })
            }
        }
    })
    
    
})

router.get('/profile/:id', function(req,res){
    console.log("Get data " + req.params.id);
    User.findById(req.params.id).exec(function(error, Users){
        if(error){
            console.log("error getting profile data");
        }else{
            oldProfileLink= Users.profileImage.split("/")[4];
            console.log(oldProfileLink);
            res.json(Users)
        }
    });
});

router.get('/email-verify/:id', function(req,res){
    console.log('email link click');
    try{
    let token = req.params.id;
    console.log(token)
    let payload = jwt.verify(token, 'deshan');
    
    console.log(payload.subject);
    User.findByIdAndUpdate(payload.subject,
          {
            $set:{
                
                emailVerified:true,
                
            }
          },
            {
              new :true
            },
            function(err,Userdata){
              if(err){
                res.send("Error updation userdata");
              }else{
               res.redirect('http://localhost:4200/email-verify');
               // res.redirect('/');
              }
            }
      
    );
    }catch(err){
        console.log(err)
    }
})

router.put('/updatecomment/:id', function(req, res){
   console.log(req.body);
    Post.findByIdAndUpdate(req.params.id, {
        $push:{
            Comments:[req.body]
        },
        
            new :true
    },
          function(err,Userdata){
            if(err){
              res.send("Error updation userdata");
            }else{
            
            console.log("update success " );
            res.status(200).send(Userdata)
            }
          
    
    })
})


router.put('/update/:id', function(req,res){
        console.log("Update User Data");
       console.log(req.params.id);
       User.findByIdAndUpdate(_id=req.params.id,
        {
          $set:{
             firstname:req.body.firstname,
             Age:req.body.Age,
             University:req.body.University,
             Title:req.body.Title,
             City:req.body.City,
             Country:req.body.Country,
             Address:req.body.Address,
             PostalCode:req.body.PostalCode,
             About:req.body.About
              
          }
        },
          {
            new :true
          },
          function(err,Userdata){
            if(err){
              res.send("Error updation userdata");
            }else{
            
            console.log("update success " + req.body.firstname)
            }
          }
    
  );
      });
      
      


router.post('/login',(req,res)=>{
    let userData=req.body

    User.findOne({email:userData.email},(err,user)=>{
        if(err){
            console.log(err);
        }
        else{
            if(!user){
                res.send({'nouser':'yes'})
            }else if(user.emailVerified==false){
                res.send({'emailVerified' : "no"})
            }
            else 
            if(user.password!==userData.password){
                res.send({'pw':'yes'})
            }else{

            let payload={ subject : user._id}
            let token=jwt.sign(payload, 'deshan')
           // res.send({'uid':user._id});
            res.send({
                'token':token,
                'uid':user._id,
                'userName':user.firstname,
                'ProfileImage':user.profileImage
            });
            }
        }
    })
})


router.put('/update-post/:id', function(req,res){
    console.log("Update Post Data");
    console.log(req.body);
    Post.findByIdAndUpdate(req.params.id,
     {
       $set:{
          Title:req.body.Title,
          Content:req.body.Content
       }
     },
       {
         new :true
       },
       function(err,Userdata){
         if(err){
           res.send("Error updation userdata");
         }else{
         
         res.send(Userdata);
         }
       }
 
);
})

const imageUpload = require('../healper/storage');
const { RSA_NO_PADDING } = require('constants');
//
router.post('/profile/:userid/uploadPhoto', imageUpload.uploadImage().array('profileImage'), (req, res, next)=>{
    console.log("dfgfd" + req.files[0].filename);
    const imagePath = 'http://localhost:3000/images/' + req.files[0].filename;
    
    if(req.files){
       console.log("file has");
       console.log(req.params.userid)
        User.findByIdAndUpdate(req.params.userid,
            {
              $set:{
                     profileImage:imagePath
              }
            },
              {
                new :true
              },
              function(err,Userdata){
                if(err){
                  res.send("Error updation userdata");
                }else{
                  res.json(Userdata);
                  console.log("profile pic upload success");
        
                  const fs = require('fs')
    
                  const path = "./images/"+oldProfileLink;
                  console.log(path);
                  try {
                    fs.unlink(path, (err) => {
                        if (err) {
                          console.error(err)
                          return;
                        }
                      
                       console.log("old image deleted");
                      })
                  } catch (error) {
                      console.log(error);
                  }
                 
              
                }
              }
        
            );

    }
})


const postupload = require('../healper/storagePost');
const Comments = require('../models/Comments');
//const { RSA_NO_PADDING } = require('constants');
//
router.post('/post/:postid/uploadPhoto', postupload.uploadImage().array('PostImage'), (req, res, next)=>{
    console.log("dfgfd" + req.files[0].filename);
    const imagePath = 'http://localhost:3000/images/post/' + req.files[0].filename;
    
    if(req.files){
       console.log("file has");
       console.log(req.params.postid)
        Post.findByIdAndUpdate(req.params.postid,
            {
              $set:{
                     PostImage:imagePath
              }
            },
              {
                new :true
              },
              function(err,Postdata){
                if(err){
                  res.send("Error updation userdata");
                }else{
                  res.json(Postdata);
                  console.log("uload post image");
              
                }
              }
        
            );

    }
})

router.delete('/delete-post/:id', (req,res)=>{
    Post.deleteOne({ _id: req.params.id }, function(err,post) {
        if (!err) {
                console.log("delete Success")
                res.json(post)
                const fs = require('fs')
    
                const path = "./images/post/"+currentPostimage;
                console.log(path);
                try {
                    fs.unlink(path, (err) => {
                        if (err) {
                          console.error(err)
                          return;
                        }
                      
                       console.log("old image deleted");
                      })
                  } catch (error) {
                      console.log(error);
                  }
                
        }
        else {
                console.log("delete Faild")
             res.status(404).send("Failed");
        }   
    });
})




module.exports=router;