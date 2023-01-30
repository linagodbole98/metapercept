const express = require("express");
const User = require("../models/userModel")
const auth = require("../middleware/auth")
const Router = express.Router()
const jwt = require("jsonwebtoken")


Router.post("/Register", async(req,res)=>{
    try{
    let data = req.body
    if(data.Password != data.ConfirmPassword) return res.status(400).send({status:false, msg:"enter confirm password again"})
    let getEmail = await User.findOne({Email:data.Email})  
    if(getEmail) return res.status(400).send({status:false, msg:" This Email is already registered"})
    const user =await User.create(data)
    res.status(201).send({status: true, data:user})
    }
    catch(err){
        res.status(500).send({message:err})
    }
})


Router.post("/login", async(req,res)=>{
    try{
        let data = req.body
        console.log(data)
       console.log(data.Email, data.Password);
        if(!data.Email || !data.Password) return res.status(400).send({msg:"please enter all details"})

        const getData = await User.findOne({Email:data.Email, Password:data.Password})
        if(!getData) return res.status(400).send({status: false, message:"this user is not registered"})

        let token = jwt.sign({
            userId :getData._id 
        },"secretKey")
        res.setHeader("authentication", token)
        res.status(200).send({status:true, message:"login successful", data : getData._id, TOKEN:token })
    }
    catch(err){
        res.status(500).send({message:err})
    }
})
 

Router.get("/getData/:id", auth, async(req,res)=>{
    try{
    const token = req.decodedToken
  
    const UserId = req.params.id
    const getData =await  User.findByIdAndUpdate(UserId,{ $set:  {['Verification status']: true}}).select({ConfirmPassword:0, __v:0})
    if(!getData) return res.status(400).send({status:false, msg : "not in database"})

    res.status(200).send({status: true, data: getData, token:token})
    }
    catch(err){
        res.status(500).send({message:err})
    }
} )




module.exports = Router