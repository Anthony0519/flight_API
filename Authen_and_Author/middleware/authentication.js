 const jwt = require("jsonwebtoken")
 const myModel = require("../model/model")
 require('dotenv').config()

 const authenticate = async (req,res,next)=>{
    try{
        const id = req.params.id

        
        const user = await myModel.findById(id)
        
        if(!user){
            return res.status(404).json({
                message: 'Authentication failed: user not found'
            })
        }
         
        const token = user.token
        if(token === null){
            return res.status(401).json({
                message: 'user logged out'
            })
        }

         jwt.verify(token,process.env.jwtKey, (err,payload)=>{
            if(err){
             return res.status(400).json({
                message: "session expired"
             })
            }else{
                req.user = payload
                next()
            }
               
        })

        

    }catch(error){
        res.status(500).json({
            error: error.message
        })
    }
 }

 module.exports = authenticate