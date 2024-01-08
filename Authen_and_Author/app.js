const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const router = require("./Router/router")

const app = express()
app.use(express.json())
app.use(router)

 
dotenv.config()
const port = process.env.port
const password = process.env.pass

mongoose.connect(password).then(()=>{
    console.log("dataBase established successfully")

    app.listen(port, ()=>{
        console.log(`server on port: ${port}`)
    })
}).catch((e)=>{
    console.log(e.message);
})