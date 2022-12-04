const express = require('express');
const {  login, signUp, getEmail } = require('./controllers/user');
const connectDataBace = require('./DataBace/db');
const cors = require('cors')

const app = express()
app.use(cors())
const PORT =process.env.PORT ||8080 ;
app.use(express.json())


app.post('/register',signUp)
app.post('/login',login)
app.get('/email',getEmail)




connectDataBace().then(()=>{
    app.listen(PORT,()=>{
        console.log(`server started at prot No. ${PORT}`)
    })
})