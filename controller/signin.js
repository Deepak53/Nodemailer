const usermodel = require('../model/user');

const signin = async(req ,res)=>{
    let user = await usermodel.findOne({_id : req.body._id});
    if(!user) return res.status(404).json({msg : "signup first"});

    console.log(user , "user after");
    
    return res.status(200).json({
        status : user.status,
        date : user.date,
        task : user.task
    })
}

module.exports = signin;