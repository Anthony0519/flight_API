const myModel = require('../model/model');
const val = require('../helpers/validator')
const bcrypt = require('bcrypt');
const sendEmail = require("../helpers/email")
const jwt = require("jsonwebtoken")
const dynamicMail = require("../helpers/html")
exports.home = (req,res)=>{
    res.send("welcome")
}

exports.createUser = async (req, res) =>{
    try{
        
        const data = {
            firstName: req.body.firstname,
            lastName: req.body.lastname,
            email: req.body.email.toLowerCase(),
            Number: req.body.number,  
            password: req.body.password
        }

        await val.validateAsync(data)

        const saltPass = bcrypt.genSaltSync(16)
        const hashPass = bcrypt.hashSync(data.password, saltPass)

        const user = await new myModel(data);

        const {firstName,lastName,email} = user
        const userToken = await jwt.sign({firstName,lastName,email},process.env.jwtKey,{expiresIn: "300s"})

        user.password = hashPass
        user.token = userToken
        await user.save()

        const link = `${req.protocol}://${req.get('host')}/verifyUser/${user._id}/${user.token}`
        const html = await dynamicMail(link, user.firstName)
        sendEmail({
            email: user.email,
            subject: "KINDLY VERIFY YOUR EMAIL",
            html: html
        })
        
  
        res.status(201).json({
            message: `User with email: '${user.email}' created successfully`,
            data: user
        })
  
    }
    catch(err){
        res.status(500).json({
            message: `Unable to create a user`,
            error: err.message
        })
    }
}

exports.verifyUser = async (req,res)=>{
    try{

        const id = req.params.id
        const usertoken = req.params.token

        jwt.verify(usertoken, process.env.jwtKey)
       
        const verify = await myModel.findByIdAndUpdate(id, {isVerified:true}, {new:true})


            res.status(200).json({
                message: "updated successfully",
                data: verify
            })
    }catch(e){
        res.status(500).json(e.message)
    }
}

 exports.login = async (req,res)=>{
    try {
        const {email,password} = req.body
        
        //check if user email exists
        const userExist = await myModel.findOne({email:email.toLowerCase()})
        //return a response if the email is not correct
        if(!userExist){
            return res.status(404).json({
                message: `user with email ${email} does not exist`
            })
        }

        //check for user password
        const checkPassword = bcrypt.compareSync(password,userExist.password)

        if(checkPassword === false){
            return res.status(400).json({
                message: `invalid password`
            })
        }

        //user token
        const userToken = jwt.sign({
            userId: userExist._id,
            email: userExist.email
        },process.env.jwtKey, {expiresIn: "1d"})

        userExist.token = userToken
        const loggedUser = await userExist.save()

        //log the user in
        res.status(200).json({
            message: "login successful",
            loggedUser
        })

    } catch (error) {
        res.status(500).json(error.message)
    }
 }

 exports.updateUser = async (req,res)=>{ 
    try{
        const id = req.user.userId


        const data = {
            firstName: req.body.firstname,
            lastName: req.body.lastname,
            email: req.body.email.toLowerCase(),
            Number: req.body.number,  
        }

        const user = await myModel.findByIdAndUpdate(id,data,{new:true})

        res.status(200).json({
            message: "updated successfully",
            data: user
        })
    }catch(error){
        res.status(500).json(error.message)
    }
 }

 exports.logOut = async(req,res)=>{
 try{
    const id = req.params.id

    const user = await myModel.findById(id)

    if(!user){
        return res.status(404).json({
            message: "user not found"
        })
    }

    user.token = null
    await user.save()

    res.status(200).json({
        message: "Logged out successfully"
    })
 }catch(error){
    res.status(500).json(error.message)
 }
 }