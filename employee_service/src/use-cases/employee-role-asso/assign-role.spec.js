const { Given, When, Then, After } = require('@cucumber/cucumber');
const exception = require('../../exceptions')
const expect = require('chai').expect;
const sinon = require('sinon');
const Joi = require('joi');

// Import use-case maker function
const makeAssignRole = require('./assign-role');

// Create sandbox
const sandbox = sinon.createSandbox();

const employeeRoleAssociationDbMethod = {
    assignRole: () => {
    }
}

// create a stub for assignRoleDb function

const assignRoleDbStub = sandbox.stub(employeeRoleAssociationDbMethod, 'assignRole');

// make a fake call to stub function 
assignRoleDbStub.callsFake((args) => {
    expect(args).deep.equal({
        roleId: this.roleId,
        id: this.id,
    })
    return 'Role assigned!';
})

Given('Employee id: {string} and role id: {string}', (id, roleId) => {
    this.roleId = roleId;
    this.id = id;
})

When('Try to assign role to employee', async () => {
    const assignRole = makeAssignRole({
        assignRoleDb: employeeRoleAssociationDbMethod.assignRole,
        ValidationError: exception.ValidationError,
        Joi,
    })

    try {
        this.result = await assignRole({
            roleId: this.roleId,
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

Then('It will give message: "{string}"', (message) => {
    expect(this.result).deep.equal(message)
})

Then('It will give error: {string} with message: "{string}"', (error, message) => {
    expect(this.error).deep.equal({
        name: error,
        message,
    })
})
