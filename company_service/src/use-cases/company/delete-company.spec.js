const { Given, When, Then, After } = require('@cucumber/cucumber');
const sinon = require('sinon');
const expect = require('chai').expect;
const Joi = require('@hapi/joi');
const exceptions = require('../../exceptions');
const makeDeleteCompany = require('./delete-company');


const sandbox = sinon.createSandbox();

const companyDbMethods = {
    deleteCompanyDb: () => {

    }
}
const employeeService = {
    deleteEmployee: () => {

    }
}
const kafka = {
    createProducer: () => {

    }
}
const deleteCompanyStub = sandbox.stub(companyDbMethods, 'deleteCompanyDb');
deleteCompanyStub.callsFake((args) => {
    console.log('args', args.id, 'id', this.id, "message", this.message)
    if (args.id == this.id)
        return '"company" is delete';
    else
        return "both not same";

});

const deleteEmployeeStub = sandbox.stub(employeeService, 'deleteEmployee');
deleteEmployeeStub.callsFake((args) => {
    return;
})

const createProducerStub = sandbox.stub(kafka, 'createProducer');
createProducerStub.callsFake((args) => {
    return;
})

Given('id:{string} to delete company', (id) => {
    console.log("companyName", id);
    this.id = id || undefined;
})

When('Try to delete company', async () => {
    const deleteCompany = makeDeleteCompany({
        deleteCompanyDb: companyDbMethods.deleteCompanyDb,
        Joi,
        ValidationError: exceptions.ValidationError,
        deleteEmployee: employeeService.deleteEmployee,
        createProducer: kafka.createProducer
    })
    try {
        this.result = await deleteCompany({
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

Then('It will give error:{string} with message:"{string}" while deleting company', (error, message) => {
    console.log("this.error", this.error, error, message)
    expect(this.error).deep.equal({
        name: error,
        message,
    });
})


Then('It will give message:"{string}" while deleting employee', (message) => {
    this.message = message;
})

Then('It will give message:"{string}" while deleting company', (message) => {
    console.log(this.result, message)
    expect(this.result).deep.equal(message)
})



