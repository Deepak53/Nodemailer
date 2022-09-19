const jwt = require('jsonwebtoken');
const config = require('../config/default');
const user = require('../model/user');


const generate = (take)=>{
    const token = jwt.sign(
        {take} , config.refreshPrivateKey , {expiresIn : config.refreshTokenExpiresIn}
    );
    return token ;
}

const verifytoken = (req ,res , next)=>{
    const token = req.header("authorization");
    let decode = jwt.verify(token ,config.refreshPrivateKey);
    if(!decode){
        res.json({message:"not a valid user"})
    }
    let userModel  =  user.findOne({ _id: decode.userId})
    if(!userModel) return res.json({ message: "User not found" });
    console.log('reqqqqqqqqqqqqq',req.tokenData);
    req.tokenData = decode;    
    next();
}


module.exports = {generate : generate ,
verifytoken : verifytoken
}