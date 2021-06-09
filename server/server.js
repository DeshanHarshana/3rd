const express=require('express')
const bodyParser=require('body-parser')
const api=require('./routes/api')

const PORT=3000;

const app = express()

app.use(bodyParser.json())

app.use('/', api)

app.listen(PORT, function(){
    console.log('Server running ' + PORT);
})