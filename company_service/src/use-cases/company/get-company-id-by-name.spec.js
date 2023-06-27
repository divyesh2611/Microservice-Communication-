const { Given, When, Then, After } = require('@cucumber/cucumber');
const sinon = require('sinon');
const expect = require('chai').expect;
const Joi = require('@hapi/joi');
const exceptions = require('../../exceptions');
const makeGetCompanyIdByName = require('./get-company-id-by-name');


const sandbox = sinon.createSandbox();

const companyDbMethods = {
    getCompanyIdByNameDb: () => {

    }
}

const getCompanyIdByNameStub = sandbox.stub(companyDbMethods, 'getCompanyIdByNameDb');
getCompanyIdByNameStub.callsFake((args) => {
    expect(args).deep.equal({
        name: this.name,
    })
    return { id: 'ads21-sdak23-dsamk' };
});


Given('name:{string} to get company id', (name) => {
    console.log("companyName", name);
    this.name = name || undefined;
})

When('Try to get company id', async () => {
    const getCompanyIdByName = makeGetCompanyIdByName({
        getCompanyIdByNameDb: companyDbMethods.getCompanyIdByNameDb,
        Joi,
        ValidationError: exceptions.ValidationError,
    })
    try {
        this.result = await getCompanyIdByName({
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
})

Then('It will give error:{string} with message:"{string}" while getting company id', (error, message) => {
    console.log("this.error", this.error, error, message)
    expect(this.error).deep.equal({
        name: error,
        message,
    });
})

Then('It will give result:"{string}" while getting company id', (message) => {
    console.log(this.result, JSON.parse(message))
    expect(this.result).deep.equal(JSON.parse(message))
})



