require('dotenv').config();
const express=require('express')
const bodyParser=require('body-parser')
const api=require('./routes/api')
const cors=require('cors')
const path=require('path')
const PORT=3000;

const app = express()
console.log(__dirname)
app.use(express.static(path.join(__dirname,'../App/dist/App')))
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors())
app.use(bodyParser.json({limit:'50mb'}))

app.use('/images', express.static(path.join('images')));
app.use('/images/post', express.static(path.join('images/post/')));
app.use('/', api)
app.get('*', (req, res)=>{
    res.sendFile(path.join(__dirname, '../App/dist/App/index.html'));
})

app.listen(PORT, function(){
    console.log('Server running ' + PORT);
})