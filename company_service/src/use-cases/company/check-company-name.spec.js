const { Given, When, Then, After } = require('@cucumber/cucumber');
const sinon = require('sinon');
const expect = require('chai').expect;
const Joi = require('@hapi/joi');
const exceptions = require('../../exceptions');

const makeCheckCompanyName = require('./check-company-name');

const sandbox = sinon.createSandbox();

const companyDbMethods = {
    checkCompanyNameDb: () => {

    }
}

const checkCompanyNameStub = sandbox.stub(companyDbMethods, 'checkCompanyNameDb');
checkCompanyNameStub.callsFake((args) => {
    expect(args).deep.equal({
        name: this.name
    })
    return { "id": "10" };
});
After(() => {
    this.data = undefined
    this.name = undefined;
})
Given('Company name:{string} to  check company name', (name) => {
    console.log("companyName", name);
    this.name = name || undefined;
});

When('Try to check name', async () => {
    const checkCompanyName = makeCheckCompanyName({
        checkCompanyNameDb: companyDbMethods.checkCompanyNameDb,
        ValidationError: exceptions.ValidationError,
        Joi,

    })
    try {
        this.result = await checkCompanyName({
            name: this.name
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
});

Then('It will give error:{string} with message:"{string}" while check company name', (error, message) => {
    expect(this.error).deep.equal({
        name: error,
        message,
    });
});

Then('It will give message:"{string}" while check company name', (data) => {
    console.log(data, this.result)
    expect(this.result).deep.equal(JSON.parse(data))
});