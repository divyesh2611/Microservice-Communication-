const nodemailer = require('nodemailer');
const makeSendEmail = require('./send-email');
const jwt = require('jsonwebtoken');
const { config } = require('../../config');
const Joi = require('joi');
const { ValidationError } = require('../../exceptions');
const dbMethods = require('../../data-access');

const Transporter = nodemailer.createTransport({
    service: "gmail",
    secure: false,
    auth: {
        user: 'divyeshparmar112001@gmail.com',
        pass: 'chxsksymzkizdrng' // app password of mail
    },
});


const sendEmail = makeSendEmail({
    nodemailer,
    jwt,
    Jwt_Secret_Key: config.Jwt_Secret_Key,
    Joi,
    Transporter,
    ValidationError,
    getEmployeeByEmail: dbMethods.employeeDbMethods.getEmployeeByEmail
})
module.exports = Object.freeze({
    sendEmail
});