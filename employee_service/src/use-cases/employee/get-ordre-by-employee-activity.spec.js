const { Given, When, Then, After } = require('@cucumber/cucumber');
const sinon = require('sinon');
const expect = require('chai').expect;
const Joi = require('@hapi/joi');
const exceptions = require('../../exceptions');
const makeGetOrderByEmployeeLoginActivity = require('./get-order-by-employee-login-activity');


const sandbox = sinon.createSandbox();

const employeeDbMethods = {
    getOrderByEmployeeLoginActivityDb: () => {

    }
}

const getEmployeeLoginActivityByOrderStub = sandbox.stub(employeeDbMethods, 'getOrderByEmployeeLoginActivityDb');
getEmployeeLoginActivityByOrderStub.callsFake((args) => {
    expect(args).deep.equal({
        id: this.id,
        orderField: this.orderField,
        orderType: this.orderType
    })
    return { auth_id: "jkds2-k84re-2ds93", employee_id: "jkds2-k84re-2ds93", location: "ahmedabad", host_ip: "127.0.0.0", host_device: "linux-Rspl285" };
});


Given('Id:{string}, orderField:{string}, orderType:{string} to get employee login activity by order', (id, orderField, orderType) => {
    console.log("id", id);
    this.id = id || undefined;
    this.orderField = orderField || undefined;
    this.orderType = orderType || undefined;
})

When('Try to get employee login activity by order', async () => {
    const getOrderByEmployeeLoginActivity = makeGetOrderByEmployeeLoginActivity({
        getOrderByEmployeeLoginActivityDb: employeeDbMethods.getOrderByEmployeeLoginActivityDb,
        Joi,
        ValidationError: exceptions.ValidationError,
    })
    try {
        this.result = await getOrderByEmployeeLoginActivity({
            id: this.id,
            orderField: this.orderField,
            orderType: this.orderType
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

Then('It will give error:{string} with message:"{string}" while getting employee login activity by order', (error, message) => {
    console.log("this.error", this.error, error, message)
    expect(this.error).deep.equal({
        name: error,
        message,
    });
})

Then('It will give result:{string} while getting employee login activity by order', (message) => {
    console.log(this.result, JSON.parse(message))
    expect(this.result).deep.equal(JSON.parse(message))
})
