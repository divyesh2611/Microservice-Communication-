const { Given, When, Then, After } = require('@cucumber/cucumber');
const sinon = require('sinon');
const expect = require('chai').expect;
const Joi = require('@hapi/joi');
const exceptions = require('../../exceptions');
const makeGetEmployeeByCompanyIdUsecase = require('./get-employee-by-company-id');


const sandbox = sinon.createSandbox();

const employeeDbMethods = {
    getEmployeeByCompanyIdDb: () => {

    }
}

const getEmployeeByCompanyIdStub = sandbox.stub(employeeDbMethods, 'getEmployeeByCompanyIdDb');
getEmployeeByCompanyIdStub.callsFake((args) => {
    expect(args).deep.equal({
        companyId: this.companyId,
    })
    return { employeeName: "divyesh", designation: "SE", address: "ahmedabad", email: "divyesh@gmail.com", contactNo: "9328487662", companyName: "rapidops" };
});


Given('companyId:{string} to get employee', (companyId) => {
    console.log("companyName", companyId);
    this.companyId = companyId || undefined;
})

When('Try to get employees', async () => {
    const getEmployeeByCompanyIdUsecase = makeGetEmployeeByCompanyIdUsecase({
        getEmployeeByCompanyIdDb: employeeDbMethods.getEmployeeByCompanyIdDb,
        Joi,
        ValidationError: exceptions.ValidationError,

    })
    try {
        this.result = await getEmployeeByCompanyIdUsecase({
            companyId: this.companyId
        })
        console.log("this.result", this.result)
    }
    catch (e) {
        console.log("errorrrrrr", e);
        this.error = {
            name: e.name,
            message: e.message
        }
    }
})

Then('It will give error:{string} with message:"{string}" while getting employees', (error, message) => {
    console.log("this.error", this.error, error, message)
    expect(this.error).deep.equal({
        name: error,
        message,
    });
})

Then('It will give result:"{string}" while getting employees', (message) => {
    console.log(this.result, JSON.parse(message))
    expect(this.result).deep.equal(JSON.parse(message))
})



