const nodemailer = require('nodemailer');
const {google} = require('googleapis');

const CLIENT_ID =   "50312766663-ubr6upqik10r9fkc8av6sn42dm38ha90.apps.googleusercontent.com"
const CLIENT_SECRET = "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"
const REDIRECT_URI = "https://developers.google.com/oauthplayground"
const REFRESH_TOKEN = "1//04DGsfxpciVHLCgYIARAAGAQSNwF-L9Ir64LmcsfJGjH_ndCKdgkOvpFy3WDIj58IPphzs2dWyVcgeglNm4KknN96oXPx4T5m37Y"




const oauth2client  = new google.auth.OAuth2(CLIENT_ID ,CLIENT_SECRET ,REDIRECT_URI ,REFRESH_TOKEN)

oauth2client.setCredentials({refresh_token : REFRESH_TOKEN});
// const accessToken =  oauth2client.getAccessToken();

const mailer = async()=>{
try {
   
    const transport = nodemailer.createTransport({
        service : "gmail",
        port : 587,
        secure : false,
        requireTLS : true,
        auth : {
            type : 'OAUTH2',
            user : '1312000deepaksingh@gmail.com',
            pass : "deepak1@",
            clientid : CLIENT_ID,
            clientsecret : CLIENT_SECRET,
            refreshtoken : REFRESH_TOKEN.replace(/\\n/g, '\n'),
            
        }
    })
    console.log("transport start here",transport);

    const mailoption = {
        from : '1312000deepaksingh@gmail.com',
        to : 'deepaksingh2000131@gmail.com',
        subject : "Get otp",
        text : 'you get an otp',
    };
    console.log("mailoption start here",mailoption);
    const res = await transport.sendMail(mailoption,(err , data)=>{
        if(err){
            console.log("err from transport",err.message);
        }
        else{
            console.log("everything working");
        }
    });
    return res;
} catch (error) {
    console.log(error.message);
}
}



// var transport = nodemailer.createTransport({
//     service: 'Gmail',
//     port : 587,
//     secure : false,
//         requireTLS : true,
//         auth:{
//             user : "deepaksingh2000131@gmail.com",
//             pass : "Deepak1$"
//         }
// })


// var mail = {
//     from : "deepaksingh2000131@gmail.com",
//     to : "deepaksingh2000131@gmail.com",
//     subject : "got an otp",
//     text : "hello"
// }
mailer().then((err , data)=>{
if(err){
    console.log("got an error",err.message);
}
else{
    console.log("mail has sent",data);
}
})


// mailer();