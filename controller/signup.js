const usermodel = require('../model/user');
const {generate} = require('../controller/token');


const signup = async(req ,res)=>{

try{ 
       let user = await usermodel.findOne({_id : req.body._id});
    if(user) return res.status(404).json({msg : "login yourself"});

    user = await usermodel.create(req.body);
    console.log(user , "uiser after");
    const refreshToken = await generate(user._id);
    return res.status(200).json({
        refreshToken,
        status : user.status,
        date : user.date,
        task : user.task,
        _id : user._id
    })}
    catch(err){
        console.log(err.message);
    }
}

const deluser = async(req , res)=>{
try {
    let user = await usermodel.findByIdAndDelete({_id : req.body._id});
    if(!user) return res.json({msg : "user del"});
    user = await usermodel.findOne({_id : req.body._id});
    if(user) return res.status(404).json({msg : "not yet deleted"});
} catch (error) {
    console.log(error.message);
}

}


const patchs = async(req,res)=>{
  try{  let user = await usermodel.findByIdAndUpdate({_id : req.body._id},{ $set: req.body }, {new : true});
        if(!user) return res.json({msg : "not updated user"});
        return res.json({msg : "user updated " , data : user})}
        catch(err){
            console.log(err.message);
        }
}

function GenerateOtp(){
    const otp = Math.floor(100000 + Math.random()*900000);
    return  otp;
}

module.exports = {signup : signup, deluser : deluser , patchs : patchs , GenerateOtp : GenerateOtp}