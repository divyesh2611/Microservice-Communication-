const { Given, When, Then, After } = require('@cucumber/cucumber');
const sinon = require('sinon');
const expect = require('chai').expect;
const makeGetAllCompany = require('./get-all-company');
const sandbox = sinon.createSandbox();

const companyDbMethods = {
    getAllCompanyDb: () => {

    }
}

const getAllCompanyStub = sandbox.stub(companyDbMethods, 'getAllCompanyDb');

getAllCompanyStub.callsFake(() => {

    if (!(this.data == "[]"))
        return "company is not found";
    else
        return "companys list";
})

Given('', () => {

})
When('Try to get all companys details', async () => {
    const getAllCompany = makeGetAllCompany({
        getAllCompanyDb: companyDbMethods.getAllCompanyDb,
    });

    this.result = await getAllCompany();

    console.log("this.result", this.result);
})



Then('It will give data:{string}', (data) => {
    this.data = data;
})


Then('give message:{string} getting companys details', (message) => {
    expect(this.result).deep.equal(message)
})










