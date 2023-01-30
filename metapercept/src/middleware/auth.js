const User = require("../models/userModel")
const jwt = require("jsonwebtoken")
 

const auth = async(req,res,next)=>{    
    console.log(req.params.id)     
    let token = req.header("authentication")
   
        jwt.verify(token, "secretKey", function(err, data){
        if(err) return res.status(400).send({msg : err})
        if(data){
            token = req.token
            data.userId == req.params.id
            next()
        }
    })  
  
    }

    module.exports = auth

    