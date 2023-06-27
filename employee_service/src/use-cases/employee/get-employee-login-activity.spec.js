const { Given, When, Then, After } = require('@cucumber/cucumber');
const sinon = require('sinon');
const expect = require('chai').expect;
const Joi = require('@hapi/joi');
const exceptions = require('../../exceptions');
const makeGetEmployeeLoginActivity = require('./get-employee-login-activity');


const sandbox = sinon.createSandbox();

const employeeDbMethods = {
    getEmployeeLoginActivitySearchDb: () => {

    }
}

const getEmployeeLoginActivitySearchStub = sandbox.stub(employeeDbMethods, 'getEmployeeLoginActivitySearchDb');
getEmployeeLoginActivitySearchStub.callsFake((args) => {
    expect(args).deep.equal({
        id: this.id,
        searchField: this.searchField,
        dataField: this.dataField
    })
    return { auth_id: "jkds2-k84re-2ds93", employee_id: "jkds2-k84re-2ds93", location: "ahmedabad", host_ip: "127.0.0.0", host_device: "linux-Rspl285" };
});


Given('Id:{string}, searchField:{string}, dataField:{string} to get employee login activity search', (id, searchField, dataField) => {
    console.log("id", id);
    this.id = id || undefined;
    this.searchField = searchField || undefined;
    this.dataField = dataField || undefined;
})

When('Try to get employee login activity by search', async () => {
    const getEmployeeLoginActivity = makeGetEmployeeLoginActivity({
        getEmployeeLoginActivitySearchDb: employeeDbMethods.getEmployeeLoginActivitySearchDb,
        Joi,
        ValidationError: exceptions.ValidationError,
    })
    try {
        this.result = await getEmployeeLoginActivity({
            id: this.id,
            searchField: this.searchField,
            dataField: this.dataField
        })
        console.log("this.result", this.result)
    }
    catch (e) {
        console.log("errorrrrrr", e);
        this.error = {
            name: e.name,
            message: e.message
        }
    }
})

Then('It will give error:{string} with message:"{string}" while getting employee login activity', (error, message) => {
    console.log("this.error", this.error, error, message)
    expect(this.error).deep.equal({
        name: error,
        message,
    });
})

Then('It will give result:{string} while getting employee login activity', (message) => {
    console.log(JSON.parse(message));
    console.log(this.result);
    expect(this.result).deep.equal(JSON.parse(message))
})
