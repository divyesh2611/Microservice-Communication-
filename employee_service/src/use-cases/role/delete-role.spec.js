const { Given, When, Then, After } = require('@cucumber/cucumber');
const sinon = require('sinon');
const expect = require('chai').expect;
const Joi = require('@hapi/joi');
const exceptions = require('../../exceptions');
const makeDeleteRole = require('./delete-role');

const sandbox = sinon.createSandbox();


const roleDbMethode = {
    deleteRole: () => {

    }
}

const deleteRoleStub = sandbox.stub(roleDbMethode, 'deleteRole');
deleteRoleStub.callsFake((args) => {
    console.log("args", args)
    expect(args).deep.equal({
        roleId: this.roleId,

    });
    return 'role is deleted';
});



// After(() => {
//     this.permission = undefined;
//     this.companyId = undefined
//     this.roleName = undefined;
//     this.isMaster = undefined;
// })

Given(`roleId:{string} to delete role`, (roleId) => {

    console.log("companyId", roleId);

    this.roleId = roleId || undefined;
});



When('Try to delete role', async () => {
    const deleteRole = makeDeleteRole({
        deleteRoleDb: roleDbMethode.deleteRole,
        Joi,
        ValidationError: exceptions.ValidationError,
    })
    try {
        this.result = await deleteRole({
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

Then('It will throw error:{string} with message:"{string}" while delete role', (error, message) => {
    expect(this.error).deep.equal({
        name: error,
        message,
    });
});

Then('It will delete role with message:{string}', (result) => {
    console.log(result, this.result);
    expect(this.result).deep.equal(result);
});