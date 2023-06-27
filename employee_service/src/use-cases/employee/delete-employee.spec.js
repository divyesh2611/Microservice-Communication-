const { Given, When, Then, After } = require('@cucumber/cucumber');
const sinon = require('sinon');
const expect = require('chai').expect;
const Joi = require('@hapi/joi');
const exceptions = require('../../exceptions');
const makeDeleteEmployee = require('./delete-employee');


const sandbox = sinon.createSandbox();

const employeeDbMethods = {
    deleteEmployeeDb: () => {

    }
}

const deleteEmployeeStub = sandbox.stub(employeeDbMethods, 'deleteEmployeeDb');
deleteEmployeeStub.callsFake((args) => {
    expect(args).deep.equal({
        id: this.id
    })
    return 'employee is deleted'
});

Given('EmployeeId:{string} to delete employee', (id) => {
    this.id = id || undefined;
})

When('Try to delete employee', async () => {
    const deleteEmployee = makeDeleteEmployee({
        deleteEmployeeDb: employeeDbMethods.deleteEmployeeDb,
        Joi,
        ValidationError: exceptions.ValidationError,
    })
    try {
        this.result = await deleteEmployee({
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

Then('It will give error:{string} with message:"{string}" while deleting employee', (error, message) => {
    console.log("this.error", this.error, error, message)
    expect(this.error).deep.equal({
        name: error,
        message,
    });
})


Then('It will give message:"{string}" while deleting employee', (message) => {
    console.log(this.result, message)
    expect(this.result).deep.equal(message);
})