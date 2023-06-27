const { Given, When, Then, After } = require('@cucumber/cucumber');
const sinon = require('sinon');
const expect = require('chai').expect;
const Joi = require('@hapi/joi');
const exceptions = require('../../exceptions');
const makeCreateMasterRole = require('./create-master-role');

const sandbox = sinon.createSandbox();

this.permissions = {
    'getLoginActivity': true,
    'createLoginginActivity': true,
    'deleteLoginActivity': true,
    'filterLoginActvity': true,
    'orderLoginActivity': true,
    'searchLoginActivty': true,
    'getEmployee': true,
    'getEmployeeById': true,
    'createRole': true,
    'assingRole': true,
    'getRole': true,
    'deleteRole': true,
    'updateRole': true,
    'deleteEmployee': true,
    'deleteEmployeeByCompanyId': true,
    'getEmployeeByCompanyId': true,
};


const useCase = {
    createRole: () => {
    }
}


const createRoleStub = sandbox.stub(useCase, 'createRole');
createRoleStub.callsFake((args) => {
    console.log("args", args)
    console.log("this.permission", this.companyId);
    expect(args).deep.equal({
        companyId: this.companyId,
        permissions: this.permissions,
        roleName: "master",
        isMaster: true
    });
    return '{"roleId":"32d6a6d2-72f3-4c4d-bc05-f1f3ff7b6153"}';
});



// After(() => {
//     this.permission = undefined;
//     this.companyId = undefined
//     this.roleName = undefined;
//     this.isMaster = undefined;
// })

Given(`master role details companyId:{string} to create master role`, (companyId) => {

    console.log("companyId", companyId);

    this.companyId = companyId || undefined;
});



When('Try to create master role', async () => {
    const createMasterRole = makeCreateMasterRole({
        createRole: useCase.createRole,
        Joi,
        ValidationError: exceptions.ValidationError,
    })
    try {
        this.result = await createMasterRole({
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

Then('It will throw error:{string} with message:"{string}" while creating master role', (error, message) => {
    expect(this.error).deep.equal({
        name: error,
        message,
    });
});

Then('It will create master role with result:{string}', (result) => {
    console.log(result, this.result);
    expect(this.result).deep.equal(result);
});