const { Given, When, Then, After } = require('@cucumber/cucumber');
const exception = require('../../exceptions')
const expect = require('chai').expect;
const sinon = require('sinon');
const Joi = require('joi');

// Import use-case maker function
const makeGetRoleId = require('./get-role-id');

// Create sandbox
const sandbox = sinon.createSandbox();

const employeeRoleAssociationDbMethod = {
    getRoleId: () => {
    }
}

// create a stub for assignRoleDb function

const getRoleIdDbStub = sandbox.stub(employeeRoleAssociationDbMethod, 'getRoleId');

// make a fake call to stub function 
getRoleIdDbStub.callsFake((args) => {
    expect(args).deep.equal({
        id: this.id,
    })
    return '32d6a6d2-72f3-4c4d-bc05-f1f3ff7b6153';
})

Given('Employee id:{string} to get role id', (id) => {
    console.log("id", id)
    this.id = id;
})

When('Try to get role id', async () => {
    const getRoleId = makeGetRoleId({
        getRoleIdDb: employeeRoleAssociationDbMethod.getRoleId,
        ValidationError: exception.ValidationError,
        Joi,
    })

    try {
        this.result = await getRoleId({
            id: this.id
        })
    }
    catch (error) {
        this.error = {
            name: error.name,
            message: error.message,
        }
    }
})

Then('It will give message:"{string}"', (result) => {
    expect(this.result).deep.equal(result);
})

Then('It will give error:{string} with message:"{string}"', (error, message) => {
    expect(this.error).deep.equal({
        name: error,
        message,
    })
})
