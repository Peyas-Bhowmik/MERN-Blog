const express = require('express');
const bodyParser = require('body-parser')
require('dotenv').config()
const path = require('path')
const connect = require('./config/db.js')
const router = require('./routes/userRoutes')
const PostRoutes = require('./routes/PostRoutes')
const ProfileRoutes = require('./routes/profileRoutes')

const app = express()

connect()

app.use(bodyParser.json())
app.use('/',router)
app.use('/',PostRoutes)
app.use('/',ProfileRoutes)

if(process.env.NODE_ENV = 'production') {
    app.use(express.static(path.join(__dirname,"/client/build/")))
    app.get('*',(req,res) => {
        res.sendFile(path.resolve(__dirname,"client","build","index.html"))
    })
}

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`Server running on port: http//localhost:${PORT}`);
})