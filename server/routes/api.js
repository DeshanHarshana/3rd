const express=require('express')
const router=express.Router();
const mongoose=require('mongoose');
const User = require('../models/User');
const jwt=require('jsonwebtoken')
const db="mongodb+srv://deshan:deshan2233@cluster0.4ynst.mongodb.net/3rd?retryWrites=true&w=majority";
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


router.get('/', function(req,res){
    res.send('From api route!');
})

router.post('/register',function(req,res){
    //let =req.body
    //let userData2=req.body.firstname
    let userData={
        email:req.body.email,
        password:req.body.password,
        data:{
            firstname:req.body.data.firstname
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
        }
    })
})

router.post('/login',(req,res)=>{
    let userData=req.body

    User.findOne({email:userData.email},(err,user)=>{
        if(err){
            console.log(err);
        }
        else{
            if(!user){
                res.status(401).send("invalid Email")
            }else 
            if(user.password!==userData.password){
                res.status(401).send("Invalid Password")
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