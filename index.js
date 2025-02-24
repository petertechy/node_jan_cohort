//dotenv, deployment, api testing, email sending

//thunder client, postman, swagger, insomia
const express = require('express')
const app = express()
const ejs = require('ejs')
const dotenv = require("dotenv")
const cors = require("cors")
const greeters = require('greet-users-package')
dotenv.config()
const mongoose = require('mongoose')
const userRoute = require('./routes/user.route')
app.use(express.urlencoded({extended:true, limit: "50mb"}))
app.use(cors())
app.use(express.json({limit: "50mb"}))
app.use('/user', userRoute)
app.set("view engine", "ejs")
const URI = process.env.MONGO_DB_URI
//environment variable
//URI - Uniform Resource Identifier
//connect to mongodb
console.log(greeters("Olanrewaju"))

mongoose.connect(URI)
.then(()=>{
     console.log("Mongodb has started successfully here")
})
.catch((err)=>{
    console.log("This is an error ", err)
})
const PORT = 5500
app.get('/', (req,res)=>{
    
})

let connection = app.listen(PORT, ()=>{
    console.log("It is working on port" + PORT)
})

let socketClient = require("socket.io")
let io = socketClient(connection, {
    cors: {origin: "*"}
})

io.on("connection", (socket)=>{
    // console.log("A user connected successfully")
    console.log(socket.id)
    socket.on("sendMsg",(message)=>{
        console.log(message)
        io.emit("broadcastMsg", message)
    })
    socket.on('disconnect', () => {
        // console.log('user disconnected');
      });
})