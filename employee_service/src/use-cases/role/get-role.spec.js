const { Given, When, Then, After } = require('@cucumber/cucumber');
const sinon = require('sinon');
const expect = require('chai').expect;
const Joi = require('@hapi/joi');
const exceptions = require('../../exceptions');
const makeGetRoleById = require('./get-role');

const sandbox = sinon.createSandbox();


const roleDbMethode = {
    getRoleById: () => {

    }
}

const getRoleByIdStub = sandbox.stub(roleDbMethode, 'getRoleById');
getRoleByIdStub.callsFake((args) => {
    console.log("args", args)
    expect(args).deep.equal({
        roleId: this.roleId,

    });
    return '{"role_id":"32d6a6d2-72f3-4c4d-bc05-f1f3ff7b6153","company_id":"32d6a6d2-72f3-4c4d-bc05-f1f3ff7b6153","isMaster":false}';
});



// After(() => {
//     this.permission = undefined;
//     this.companyId = undefined
//     this.roleName = undefined;
//     this.isMaster = undefined;
// })

Given(`roleId:{string} to get role`, (roleId) => {
    console.log("hdsajlkjlsakj*****************88")

    console.log("roleId", roleId);

    this.roleId = roleId || undefined;
});



When('Try to get role', async () => {
    const getRoleById = makeGetRoleById({
        getRoleByIdDb: roleDbMethode.getRoleById,
        Joi,
        ValidationError: exceptions.ValidationError,
    })
    try {
        this.result = await getRoleById({
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

Then('It will throw error:{string} with message:"{string}" while getting role', (error, message) => {
    expect(this.error).deep.equal({
        name: error,
        message,
    });
});

Then('It will get role with message:{string}', (result) => {
    console.log(result, this.result);
    expect(this.result).deep.equal(result);
});