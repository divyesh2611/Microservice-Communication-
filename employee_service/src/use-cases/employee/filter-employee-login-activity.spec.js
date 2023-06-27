const { Given, When, Then, After } = require('@cucumber/cucumber');
const sinon = require('sinon');
const expect = require('chai').expect;
const Joi = require('@hapi/joi');
const exceptions = require('../../exceptions');
const makeFilterEmployeeLoginActivity = require('./filter-employee-login-activity');


const sandbox = sinon.createSandbox();

const employeeDbMethods = {
    getEmployeeLoginActivityDb: () => {

    }
}
const getEmployeeLoginActivityStub = sandbox.stub(employeeDbMethods, 'getEmployeeLoginActivityDb');
getEmployeeLoginActivityStub.callsFake((args) => {
    expect(args).deep.equal({
        employeeId: this.employeeId
    })
    return [{ auth_id: "jkdsk-32jka-3rw8h", employee_id: "kjsjlie-ewrwmwe-rwd3", host_device: "linux-R285", host_ip: "127.0.0.0", location: "Ahmedabad" }];
});

Given('Employee login activity employeeId:{string}, ip:{string}, location:{string}, device:{string} to filter employee login activity', (employeeId, ip, location, device) => {
    this.employeeId = employeeId || undefined;
    this.ip = ip || undefined;
    this.location = location || undefined;
    this.device = device || undefined;
})

When('Try to filter employee login activity', async () => {
    const filterEmployeeLoginActivity = makeFilterEmployeeLoginActivity({
        getEmployeeLoginActivityDb: employeeDbMethods.getEmployeeLoginActivityDb,
        Joi,
        ValidationError: exceptions.ValidationError,
    })
    try {
        this.result = await filterEmployeeLoginActivity({
            employeeId: this.employeeId,
            ip: this.ip,
            location: this.location,
            device: this.device
        })
    }
    catch (e) {
        console.log("errorrrrrr", e);
        this.error = {
            name: e.name,
            message: e.message
        }
    }
})


Then('It will filter employee login activity with details:{string}', (message) => {
    console.log(this.result, JSON.parse(message))
    expect(this.result).deep.equal([JSON.parse(message)]);
})