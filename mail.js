const nodemailer = require('nodemailer');
const {google} = require('googleapis');


const CLIENT_ID =   "840963336219-5do1n8k0l8jnc54mdo217bjagdqc7d88.apps.googleusercontent.com"
const CLIENT_SECRET = "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"
const REDIRECT_URI = "https://developers.google.com/oauthplayground"
const REFRESH_TOKEN = " 1//04wXMug7L_Ws-CgYIARAAGAQSNwF-L9IrO263eSypMU33wS3cSoYeDdcOVsPqlDgIdKTQlOsbvCbDXqtIQNSGwktuGg2D1mKgQyg"


const oauth2client  = new google.auth.OAuth2(CLIENT_ID ,CLIENT_SECRET ,REDIRECT_URI ,REFRESH_TOKEN)

oauth2client.setCredentials({refresh_token : REFRESH_TOKEN});

const mail =  (data)=> {
    return new Promise(async (resolve, reject) => {
        // Transport setup
        const transport = nodemailer.createTransport({
            service : "gmail",
            // port : 587,
            // secure : false,
            // requireTLS : true,
            auth : {
                type : 'OAUTH2',
                user : '1312000deepaksingh@gmail.com',
                pass : "mbzs7980",
                clientid : CLIENT_ID,
                clientsecret : CLIENT_SECRET,
                refreshtoken : REFRESH_TOKEN.replace(/\\n/g, '\n'),
                accessToken : "ya29.a0AVA9y1tz3v3xl2lNuCYLNh6c6ZtyK1BjN9QGRy3QR4jK1b53oVtphjWRhCy4PKIAMt65r6BR5ZeNtHN1MHEhfshY0ABi-JXRjfdreO3YW5-urbX-d5SeNg8tyRbqGRU2sIp_RHp2RaYR6h9MYgDHCkUuuWWCaCgYKATASARESFQE65dr849gvOyiGpwMPx1B2WUFoGg0163"
                
            }
        })

        try {
                let info = await transport.sendMail({
                    from    : "deepaksingh@gmail.com",
                    to      : data.to,
                    subject : "Email Verification",
                    text    : data.text,
                })

                console.log('INFO =========>> ', info)
                resolve(info);

        } catch (error) {
            console.log('3333333333333333333333333',error)
            reject(error.message)
        }
    })
}


mail().then((err , data)=>{
if(err){
    console.log("got an error",err.message);
}
else{
    console.log("mail has sent",data);
}
})





module.exports = {mail : mail}

