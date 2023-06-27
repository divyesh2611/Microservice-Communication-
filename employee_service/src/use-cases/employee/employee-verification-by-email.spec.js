const { Given, When, Then, After } = require('@cucumber/cucumber');
const sinon = require('sinon');
const expect = require('chai').expect;
const Joi = require('@hapi/joi');
const jwt = require('jsonwebtoken');
const exceptions = require('../../exceptions');
const makeEmployeeVerificationByEmail = require('./employee-verification-by-email');
const { config } = require('../../config');

const sandbox = sinon.createSandbox();


const employeeDbMethods = {
    updateEmployeeVerificationDb: () => {

    }
}

const updateEmployeeVerificationStub = sandbox.stub(employeeDbMethods, 'updateEmployeeVerificationDb');
updateEmployeeVerificationStub.callsFake((args) => {

    return;
});

Given('verificationToken:{string} to verify employee', (verificationToken) => {
    this.verificationToken = verificationToken;
})

When('Try to verify employees', async () => {
    const employeeVerificationByEmail = makeEmployeeVerificationByEmail({
        updateEmployeeVerificationDb: employeeDbMethods.updateEmployeeVerificationDb,
        ValidationError: exceptions.ValidationError,
        Jwt_Secret_Key: config.Jwt_Secret_Key,
        jwt,
    })
    try {
        this.result = await employeeVerificationByEmail({
            verificationToken: this.verificationToken
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

Then('It will give error:{string} with message:"{string}" while verifing employees', (error, message) => {
    console.log("this.error", this.error, error, message)
    expect(this.error).deep.equal({
        name: error,
        message,
    });
})


Then('It will give message:"{string}" while verifing employees', (message) => {
    console.log(this.result, message)
    expect(this.result).deep.equal(message);
})