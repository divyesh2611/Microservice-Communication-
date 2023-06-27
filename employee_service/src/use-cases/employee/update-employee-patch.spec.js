const { Given, When, Then, After } = require('@cucumber/cucumber');
const sinon = require('sinon');
const expect = require('chai').expect;
const Joi = require('@hapi/joi');
const exceptions = require('../../exceptions');
const makeUpdateEmployeePatch = require('./update-employee-patch');


const sandbox = sinon.createSandbox();

const employeeDbMethods = {
    updateEmployeeDb: () => {
    }
}




const updateEmployeeStub = sandbox.stub(employeeDbMethods, 'updateEmployeeDb');
updateEmployeeStub.callsFake((args) => {
    expect(args).deep.equal({
        updateQuery: 'name == $2, emailAddress == $3 WHERE id = $1',
        updateParams: ['102e9677-3643-4d42-a193-a2e1dd078fdb', 'karnav', 'karnav@gmail.com']
    })
    return 'employee is updated'
});


Given('Employee Id:{string}, updateData:{string} to update employee', (id, updateData) => {
    this.id = id || undefined;
    this.updateData = JSON.parse(updateData) || undefined;
})

When('Try to update employee', async () => {
    const updateEmployeePatch = makeUpdateEmployeePatch({
        updateEmployeeDb: employeeDbMethods.updateEmployeeDb,
        Joi,
        ValidationError: exceptions.ValidationError,
    })
    try {
        this.result = await updateEmployeePatch({
            id: this.id,
            updateData: this.updateData
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

Then('It will give error:{string} and message:"{string}" while updating employee', (error, message) => {
    console.log("this.error", this.error, error, message)
    expect(this.error).deep.equal({
        name: error,
        message,
    });
})

Then('It will give message:"{string}" while updating employee', (message) => {
    console.log(this.result, message)
    expect(this.result).deep.equal(message)
})
