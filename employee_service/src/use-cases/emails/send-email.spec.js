const { Given, When, Then, After } = require('cucumber');
const sinon = require('sinon');
const expect = require('chai').expect;
const jwt = require('jsonwebtoken')
const Joi = require('@hapi/joi');
const makeSendEmail = require('./send-email');
const sandbox = sinon.createSandbox();
const sendEmailMethodes = {
    sendEmailTransporter: () => {

    }
}

const sendEmailTransporterStub = sandbox.stub(sendEmailMethodes, 'sendEmailTransporter')

sendEmailTransporterStub.callsFake((args) => {
    console.log("args", args);

    expect(args).deep.equal({

    })

    return 'email is sent'

})


Given('Email:{string}, id:{string} to send email to employee', (toEmail, id) => {
    this.toEmail = toEmail || undefined;
    this.id = id || undefined;
})

When('Try to send email to employee', async () => {
    const sendEmail = makeSendEmail({
        jwt,
        Jwt_Secret_Key: config.Jwt_Secret_Key,
        Joi,
        sendEmailTransporter: sendEmailMethodes.sendEmailTransporter
    })
    try {
        this.result = await sendEmail({
            toEmail: this.toEmail,
            id: this.id
        })
    }
    catch (e) {
        console.log("errorrrrrr", e);
        this.error = {
            name: e.name,
            message: e.message
        }
    }
})

Then('It will give error:{string} with message:"{string}" while sending email', (error, message) => {
    console.log("this.error", this.error, error, message)
    expect(this.error).deep.equal({
        name: error,
        message,
    });
})


Then('It will give message:"{string}" while sending employee', (message) => {
    console.log(this.result, message)
    expect(this.result).deep.equal(message);
})




