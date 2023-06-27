const { Given, When, Then, After } = require('@cucumber/cucumber');
const sinon = require('sinon');
const expect = require('chai').expect;
const Joi = require('@hapi/joi');
const exceptions = require('../../exceptions');
const makeDeleteEmployeeByCompanyId = require('./delete-employee-by-company-id');


const sandbox = sinon.createSandbox();

const employeeDbMethods = {
    deleteEmployeeByCompanyIdDb: () => {

    }
}

const deleteEmployeeByCompanyIdStub = sandbox.stub(employeeDbMethods, 'deleteEmployeeByCompanyIdDb');
deleteEmployeeByCompanyIdStub.callsFake((args) => {
    expect(args).deep.equal({
        companyId: this.companyId
    })
    return 'employee is deleted'
});

Given('CompanyId:{string} to delete employee', (companyId) => {
    this.companyId = companyId || undefined;
})

When('Try to delete employees', async () => {
    const deleteEmployeeByCompanyId = makeDeleteEmployeeByCompanyId({
        deleteEmployeeByCompanyIdDb: employeeDbMethods.deleteEmployeeByCompanyIdDb,
        Joi,
        ValidationError: exceptions.ValidationError,
    })
    try {
        this.result = await deleteEmployeeByCompanyId({
            companyId: this.companyId
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

Then('It will give error:{string} with message:"{string}" while deleting employees', (error, message) => {
    console.log("this.error", this.error, error, message)
    expect(this.error).deep.equal({
        name: error,
        message,
    });
})


Then('It will give message:"{string}" while deleting employees', (message) => {
    console.log(this.result, message)
    expect(this.result).deep.equal(message);
})




