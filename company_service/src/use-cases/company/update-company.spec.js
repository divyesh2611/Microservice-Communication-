const { Given, When, Then, After } = require('@cucumber/cucumber');
const sinon = require('sinon');
const expect = require('chai').expect;
const Joi = require('@hapi/joi');
const exceptions = require('../../exceptions');

const makeUpdateCompany = require('./update-company');

const sandbox = sinon.createSandbox();

const companyDbMethods = {
    updateCompanyDb: () => {
    }
}

const updateCompanyStub = sandbox.stub(companyDbMethods, 'updateCompanyDb');
updateCompanyStub.callsFake((args) => {

    console.log("args", args)
    expect(args).deep.equal({
        updateQuery: 'name == $2, foundedYear == $3 WHERE id = $1',
        updateParams: ['102e9677-3643-4d42-a193-a2e1dd078fdb', 'rapidops', 2008]
    });
    return { "id": '102e9677-3643-4d42-a193-a2e1dd078fdb' };
});


Given('CompanyId:{string} updateData:{string} to update company', (id, updateData) => {

    this.id = id || undefined;
    this.updateData = JSON.parse(updateData) || undefined;

});

When('Try to update company', async () => {
    const updateCompany = makeUpdateCompany({
        updateCompanyDb: companyDbMethods.updateCompanyDb,
        Joi,
        ValidationError: exceptions.ValidationError,
    })
    try {
        this.result = await updateCompany({
            updateData: this.updateData,
            id: this.id
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

Then('It will give error:{string} with message:"{string}" while to updating company', (error, message) => {
    expect(this.error).deep.equal({
        name: error,
        message,
    });
});

Then('It will give result:{string} while to updating company', (result) => {
    expect(this.result).deep.equal(JSON.parse(result));
})