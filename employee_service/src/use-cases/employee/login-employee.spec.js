const { Given, When, Then, After } = require('@cucumber/cucumber');
const sinon = require('sinon');
const expect = require('chai').expect;
const Joi = require('@hapi/joi');
const exception = require('../../exceptions');

const jwt = require('jsonwebtoken')

const makeLoginEmployee = require('./login-employee');
const { config } = require('../../config');
const sandbox = sinon.createSandbox();

const { v4: uuidv4 } = require('uuid');


// employeeDb object for stub
const employeeDbMethods = {
    insertAccessTokenDb: () => {
    },
    getEmployeeByEmailDb: () => {

    }
}

const getEmployeeByEmailStub = sandbox.stub(employeeDbMethods, 'getEmployeeByEmailDb');
getEmployeeByEmailStub.callsFake((args) => {
    console.log("args", args);
    expect(args).deep.equal({
        emailAddress: this.emailAddress,
    })
    this.id = 'dksjfi3-dfksdse-33mawqmlko4';
    return { id: 'dksjfi3-dfksdse-33mawqmlko4', password: 'divyesh', is_verified: 'employee is verified' };
})

const insertAccessTokenStub = sandbox.stub(employeeDbMethods, 'insertAccessTokenDb')

insertAccessTokenStub.callsFake((args) => {
    return;

})

Given('Employee credential emailAddress:{string}, password:{string}, ip:{string}, device:{string}, location:{string} to login employee', (emailAddress, password, ip, device, location) => {

    console.log("\nIn Given:")
    console.log(emailAddress, password, ip, device, location)
    this.emailAddress = emailAddress || undefined;
    this.password = password || undefined;
    this.ip = ip || undefined;
    this.location = location || undefined;
    this.device = device || undefined;

})

When('Try to login employee', async () => {
    const loginEmployee = makeLoginEmployee({
        insertAccessTokenDb: employeeDbMethods.insertAccessTokenDb,
        getEmployeeByEmailDb: employeeDbMethods.getEmployeeByEmailDb,
        ValidationError: exception.ValidationError,
        uuidv4,
        Joi,
        Jwt_Secret_Key: config.Jwt_Secret_Key,
        jwt
    });

    try {
        this.result = await loginEmployee({
            emailAddress: this.emailAddress,
            password: this.password,
            hostIp: this.ip,
            location: this.location,
            hostDeviceName: this.device
        });
    }
    catch (e) {
        this.error = {
            name: e.name,
            message: e.message,
        };
    }
});

Then('It will throw error:{string} with message:"{string}" while login employee', (error, message) => {
    expect(this.error).deep.equal({
        name: error,
        message,
    });
});

Then('It will login employee and give message:"{string}"', (message) => {
    console.log("then")
    console.log(this.result.message);
    console.log(message);
    expect(this.result.message).deep.equal(message);
});