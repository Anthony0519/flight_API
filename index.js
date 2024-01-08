const express = require("express")
const app = express()
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const router = require("./Router/route")

app.use(express.json())
app.use(router)

dotenv.config()
const port = process.env.proPort
const dataBasePassword = process.env.proPass

mongoose.connect(dataBasePassword).then(()=>{
    console.log("successfully connected to dataBase")

    app.listen(port, ()=>{
        console.log(`server on port: ${port}`)
    })
}).catch((error)=>{
    console.log(error.message)
})

