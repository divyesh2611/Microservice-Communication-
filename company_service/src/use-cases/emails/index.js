const nodemailer = require('nodemailer');
const makeSendEmail = require('./send-email');
const Joi = require('joi');

const Transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'divyeshparmar112001@gmail.com',
        pass: 'chxsksymzkizdrng'
    }
});
const sendEmail = makeSendEmail({
    Transporter: Transporter,
    Joi
})
module.exports = {
    sendEmail
}