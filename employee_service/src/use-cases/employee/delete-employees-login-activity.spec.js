const { Given, When, Then, After } = require('@cucumber/cucumber');
const sinon = require('sinon');
const expect = require('chai').expect;
const Joi = require('@hapi/joi');
const exceptions = require('../../exceptions');
const makeDeleteEmployeeLoginActivity = require('./delete-employees-login-activity');


const sandbox = sinon.createSandbox();

const employeeDbMethods = {
    deleteEmployeeLoginActivityDb: () => {

    }
}

const deleteEmployeeLoignActivityStub = sandbox.stub(employeeDbMethods, 'deleteEmployeeLoginActivityDb');
deleteEmployeeLoignActivityStub.callsFake((args) => {
    expect(args).deep.equal({
        authId: this.authIds[0].id
    })
    return 'employees login activity is deleted'
});

Given('AuthIds:{string} to delete employee login activity', (authIds) => {
    console.log("authids", typeof authIds)
    if (authIds)
        this.authIds = [JSON.parse(authIds)]
    else
        this.authIds = undefined;
    console.log("this.authid", this.authIds)
})

When('Try to delete employees login activity', async () => {
    const deleteEmployeeLoginActivity = makeDeleteEmployeeLoginActivity({
        deleteEmployeeLoginActivityDb: employeeDbMethods.deleteEmployeeLoginActivityDb,
        Joi,
        ValidationError: exceptions.ValidationError,
    })
    try {
        console.log("authIds", this.authIds);

        this.result = await deleteEmployeeLoginActivity({
            authIds: this.authIds
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

Then('It will give error:{string} with message:"{string}" while deleting employee login activity', (error, message) => {
    console.log("this.error", this.error, error, message)
    expect(this.error).deep.equal({
        name: error,
        message,
    });
})


Then('It will give message:"{string}" while deleting employee login activity', (message) => {
    console.log(this.result, message)
    expect(this.result).deep.equal(message);
})