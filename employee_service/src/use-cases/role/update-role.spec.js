const { Given, When, Then, After } = require('@cucumber/cucumber');
const sinon = require('sinon');
const expect = require('chai').expect;
const Joi = require('@hapi/joi');
const exceptions = require('../../exceptions');

const makeUpdateRole = require('./update-role');

const sandbox = sinon.createSandbox();

const roleDbMethods = {
    updateRoleDb: () => {
    }
}

const updateRoleStub = sandbox.stub(roleDbMethods, 'updateRoleDb');
updateRoleStub.callsFake((args) => {

    console.log("args", args)
    expect(args).deep.equal({
        updateQuery: 'roleName == $2, permission == $3 WHERE role_id = $1',
        updateParams: ['102e9677-3643-4d42-a193-a2e1dd078fdb', 'writer', '{"createEmployee":true}']
    });
    return { "id": "102e9677-3643-4d42-a193-a2e1dd078fdb" };
});



Given('roleId:{string} updateData:{string} to update role', (roleId, updateData) => {

    this.roleId = roleId || undefined;
    this.updateData = JSON.parse(updateData) || undefined;

});

When('Try to update role', async () => {
    const updateRole = makeUpdateRole({
        updateRoleDb: roleDbMethods.updateRoleDb,
        Joi,
        ValidationError: exceptions.ValidationError,
    })
    try {
        this.result = await updateRole({
            updateData: this.updateData,
            roleId: this.roleId
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

Then('It will give error:{string} with message:"{string}" while to updating role', (error, message) => {
    expect(this.error).deep.equal({
        name: error,
        message,
    });
});

Then('It will give result:{string} while to updating role', (result) => {
    console.log("this.result", this.result);
    console.log("result", result)
    expect(this.result).deep.equal(JSON.parse(result));
})