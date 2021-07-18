const nodemailer = require('nodemailer');

function sendMail({from, To, subject, text, html}){
    let transporter= nodemailer.createTransport({
    })
}

module.exports=sendMail;