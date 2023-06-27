const { Given, When, Then, After } = require('@cucumber/cucumber');
const sinon = require('sinon');
const expect = require('chai').expect;
const Joi = require('@hapi/joi');
const exceptions = require('../../exceptions');
const makeGetCompanyById = require('./get-company-by-id');


const sandbox = sinon.createSandbox();

const companyDbMethods = {
    getCompanyDb: () => {

    }
}

const getCompanyStub = sandbox.stub(companyDbMethods, 'getCompanyDb');
getCompanyStub.callsFake((args) => {
    expect(args).deep.equal({
        id: this.id,
    })
    return { companyName: 'rapidops', foundedYear: '2009', city: 'ahmedabad' };
});


Given('id:{string} to get company', (id) => {
    console.log("companyName", id);
    this.id = id || undefined;
})

When('Try to get company', async () => {
    const getCompanyById = makeGetCompanyById({
        getCompanyDb: companyDbMethods.getCompanyDb,
        Joi,
        ValidationError: exceptions.ValidationError,

    })
    try {
        this.result = await getCompanyById({
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

Then('It will give error:{string} with message:"{string}" while getting company', (error, message) => {
    console.log("this.error", this.error, error, message)
    expect(this.error).deep.equal({
        name: error,
        message,
    });
})

Then('It will give result:"{string}" while getting company', (message) => {
    console.log(this.result, JSON.parse(message))
    expect(this.result).deep.equal(JSON.parse(message))
})



