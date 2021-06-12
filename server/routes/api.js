const express=require('express')
const router=express.Router();
const dotenv = require('dotenv');
const mongoose=require('mongoose');
const User = require('../models/User');
const jwt=require('jsonwebtoken');
const { static } = require('express');
const db="mongodb+srv://deshan:deshan2233@cluster0.4ynst.mongodb.net/3rd?retryWrites=true&w=majority";
const mailgun = require("mailgun-js");
const DOMAIN = 'sandboxc32dc6a915c7493eb5f539e8c8129919.mailgun.org';
const mg = mailgun({apiKey: '4ca8a4335b4d7f733f49be26c745dc3d-90ac0eb7-d26ba9a2', domain: DOMAIN});

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

router.get('/check', async function(req,res){
    
     let result = await getuidFromEmail("nawarathnadeshan@gmail.com");
     console.log(result);
     res.send(result)
    
      
   
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
                    emailVerified:false,
                    data:{
                        firstname:req.body.data.firstname,
                        
                        emailToken:''
                    }
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

                        const data = {
                            from: 'noreply@hello.com',
                            to: regUser.email,
                            subject: 'Hello',
                            html:`
                            <html>
                            <body>
                                <h2>please click on given link</h2>
                                <a href="http://localhost:3000/email-verify/${token}">link text</a>
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

async function getuidFromEmail(email_address){
    var releventUser;
   await User.findOne({email:email_address},(err,user)=>{
        
        if(err){
            console.log(err)
            
        }
        else if(user)
        {
            releventUser=user;
          
        }
        else
        {
              console.log("error");
              
        }
    });
   return releventUser._id;
}



    router.put('/update', function(req,res){
        console.log("Update User Data");
        User.findByIdAndUpdate("60c44c9eff528509406892ac",
          {
            $set:{
               
                password:'xxxxxxxxxx',
                data:{
                    firstname:'xxxxxxxx',
                    emailVerified:true,
                   
                }
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
            res.status(200).send({token})
            }
        }
    })
})

router.get('/events', (req,res)=>{
    let events=[
        {
            "id":"1",
            "name":"Auto Expo",
            "description":"lorem ksd",
            "date":"2021/2/3"
        },
        {
            "id":"1",
            "name":"Auto Expo",
            "description":"lorem ksd",
            "date":"2021/2/3"
        },
        {
            "id":"1",
            "name":"Auto Expo",
            "description":"lorem ksd",
            "date":"2021/2/3"
        },
        {
            "id":"1",
            "name":"Auto Expo",
            "description":"lorem ksd",
            "date":"2021/2/3"
        },
        {
            "id":"1",
            "name":"Auto Expo",
            "description":"lorem ksd",
            "date":"2021/2/3"
        },
        {
            "id":"1",
            "name":"Auto Expo",
            "description":"lorem ksd",
            "date":"2021/2/3"
        }, {
            "id":"1",
            "name":"Auto Expo",
            "description":"lorem ksd",
            "date":"2021/2/3"
        },
        {
            "id":"1",
            "name":"Auto Expo",
            "description":"lorem ksd",
            "date":"2021/2/3"
        },
        {
            "id":"1",
            "name":"Auto Expo",
            "description":"lorem ksd",
            "date":"2021/2/3"
        },
    ]
    res.json(events)
})

router.get('/special', verifyToken, (req,res)=>{
    let events=[
        {
            "id":"1",
            "name":"Auto Expo",
            "description":"lorem ksd",
            "date":"2021/2/3"
        },
        {
            "id":"1",
            "name":"Auto Expo",
            "description":"lorem ksd",
            "date":"2021/2/3"
        },
        {
            "id":"1",
            "name":"Auto Expo",
            "description":"lorem ksd",
            "date":"2021/2/3"
        }
    ]
    res.json(events)
})



module.exports=router;