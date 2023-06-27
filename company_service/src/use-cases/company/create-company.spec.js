const { Given, When, Then, After } = require('@cucumber/cucumber');
const sinon = require('sinon');
const expect = require('chai').expect;
const Joi = require('@hapi/joi');
const exceptions = require('../../exceptions');
const makeCreateCompany = require('./create-company');

const sandbox = sinon.createSandbox();

const companyDbMethods = {
    createCompanyDb: () => {
    }
}
const companyUsecase = {
    checkCompanyName: () => {
    }
}

const createCompanyStub = sandbox.stub(companyDbMethods, 'createCompanyDb');
createCompanyStub.callsFake((args) => {
    expect(args).deep.equal({
        name: this.name,
        foundedYear: this.foundedYear,
        city: this.city,
        emailAddress: this.emailAddress
    });
    return '{"id":1}';
});

const checkCompanyNameUsecaseStub = sandbox.stub(companyUsecase, 'checkCompanyName');
checkCompanyNameUsecaseStub.callsFake((args) => {
    expect(args).deep.equal({
        name: this.name,
    });
    return this.companyDetails;
});


After(() => {
    this.city = undefined;
    this.companyDetails = undefined
    this.name = undefined;
    this.foundedYear = undefined;
})

Given('Company details name:{string},foundedYear:{string},city:{string},emailAddress:{string},owner:{string} to create new company', (name, foundedYear, city, emailAddress, owner) => {
    console.log("name", name);
    console.log("foundedYear", foundedYear);
    console.log("city", city);
    console.log("owner", owner)

    this.name = name || undefined;
    this.foundedYear = foundedYear || undefined;
    this.city = city || undefined;
    this.emailAddress = emailAddress || undefined;
    this.owner = JSON.parse(owner) || undefined
});

Given('Alread existed company details:"{string}" with same name', (companyDetails) => {
    console.log("companyDetails", companyDetails);
    this.companyDetails = companyDetails;
});

When('Try to create new company', async () => {
    const createCompany = makeCreateCompany({
        createCompanyDb: companyDbMethods.createCompanyDb,
        Joi,
        checkCompanyName: companyUsecase.checkCompanyName,
        ValidationError: exceptions.ValidationError,
        ForbiddenError: exceptions.ForbiddenError,

    })
    try {
        this.result = await createCompany({
            name: this.name,
            foundedYear: this.foundedYear,
            city: this.city,
            emailAddress: this.emailAddress
        })
    }
    catch (e) {
        console.log(e);
        this.error = {
            name: e.name,
            message: e.message
        }
    }
});

Then('It will throw error:{string} with message:"{string}" while creating new company', (error, message) => {
    expect(this.error).deep.equal({
        name: error,
        message,
    });
});

Then('It will create new company with details:"{string}"', (newUserDetails) => {
    console.log(newUserDetails, this.result);
    expect(this.result).deep.equal(newUserDetails);
});