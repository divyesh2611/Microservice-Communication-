const company= require('./company');
const kafka = require('./kafka');
const emails = require('./emails');
module.exports = Object.freeze({
    company,
    kafka,
    emails
})