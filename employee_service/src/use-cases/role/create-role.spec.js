const { Given, When, Then, After } = require('@cucumber/cucumber');
const sinon = require('sinon');
const expect = require('chai').expect;
const Joi = require('@hapi/joi');
const exceptions = require('../../exceptions');
const makeCreateRole = require('./create-role');

const sandbox = sinon.createSandbox();

const roleDbMethods = {
    createRoleDb: () => {
    }
}


const createRoleStub = sandbox.stub(roleDbMethods, 'createRoleDb');
createRoleStub.callsFake((args) => {
    console.log("args", args);
    console.log("this.permission", this.permission)
    console.log("this.permission", this.roleName)
    console.log("this.permission", this.companyId)
    console.log("this.permission", this.isMaster)
    expect(args).deep.equal({
        permission: this.permission,
        roleName: this.roleName,
        companyId: this.companyId,
        isMaster: this.isMaster
    });
    return '{"roleId":"32d6a6d2-72f3-4c4d-bc05-f1f3ff7b6153"}';
});



// After(() => {
//     this.permission = undefined;
//     this.companyId = undefined
//     this.roleName = undefined;
//     this.isMaster = undefined;
// })

Given(`role details permission:{string},roleName:{string},isMaster:{string},companyId:{string} to create new role`, (permission, roleName, isMaster, companyId) => {
    console.log("permission", permission);
    console.log("roleName", roleName);
    console.log("isMaster", isMaster);
    console.log("companyId", companyId);

    this.permission = permission || undefined;
    this.companyId = companyId || undefined;
    this.roleName = roleName || undefined;
    this.isMaster = isMaster || undefined;
});



When('Try to create new role', async () => {
    const createRole = makeCreateRole({
        createRoleDb: roleDbMethods.createRoleDb,
        Joi,
        ValidationError: exceptions.ValidationError,
    })
    try {
        this.result = await createRole({
            permission: this.permission,
            roleName: this.roleName,
            isMaster: this.isMaster,
            companyId: this.companyId
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

Then('It will throw error:{string} with message:"{string}" while creating new role', (error, message) => {
    expect(this.error).deep.equal({
        name: error,
        message,
    });
});

Then('It will create new role with result:{string}', (result) => {
    console.log(result, this.result);
    expect(this.result).deep.equal(result);
});