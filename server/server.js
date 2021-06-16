require('dotenv').config();
const express=require('express')
const bodyParser=require('body-parser')
const api=require('./routes/api')
const cors=require('cors')
const path=require('path')
const PORT=3000;

const app = express()
app.use(cors())
app.use(bodyParser.json())

app.use('/images', express.static(path.join('images')));
app.use('/', api)


app.listen(PORT, function(){
    console.log('Server running ' + PORT);
})