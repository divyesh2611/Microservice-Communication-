const { Given, When, Then, After } = require('@cucumber/cucumber');
const sinon = require('sinon');
const expect = require('chai').expect;
const Joi = require('@hapi/joi');
const exceptions = require('../../exceptions');
const makeGetEmployeeById = require('./get-employee-by-id');


const sandbox = sinon.createSandbox();

const employeeDbMethods = {
    getEmployeeDb: () => {

    }
}

const getEmployeeStub = sandbox.stub(employeeDbMethods, 'getEmployeeDb');
getEmployeeStub.callsFake((args) => {
    expect(args).deep.equal({
        id: this.id,
    })
    return { employeeName: "divyesh", designation: "SE", address: "ahmedabad", email: "divyesh@gmail.com", contactNo: "9328487662", companyName: "rapidops" };
});

Given('EmployeeId:{string} to get employee', (id) => {
    console.log("id", id);
    this.id = id || undefined;
})

When('Try to get employee', async () => {
    const getEmployeeById = makeGetEmployeeById({
        getEmployeeDb: employeeDbMethods.getEmployeeDb,
        Joi,
        ValidationError: exceptions.ValidationError,

    })
    try {
        this.result = await getEmployeeById({
            id: this.id
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

Then('It will give error:{string} with message:"{string}" while getting employee', (error, message) => {
    console.log("this.error", this.error, error, message)
    expect(this.error).deep.equal({
        name: error,
        message,
    });
})

Then('It will give result:"{string}" while getting employee', (message) => {
    console.log(this.result, JSON.parse(message))
    expect(this.result).deep.equal(JSON.parse(message))
})



