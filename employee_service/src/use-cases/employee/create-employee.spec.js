const { Given, When, Then, After } = require('@cucumber/cucumber');
const sinon = require('sinon');
const expect = require('chai').expect;
const Joi = require('@hapi/joi');
const axios = require('axios')
const exception = require('../../exceptions')

const makeInsertEmployee = require('./create-employee');
const sandbox = sinon.createSandbox();

// employeeDb object for stub
const employeeDbMethods = {
  createEmployeeDb: () => {
  },
}

// Employee service stub object 
const companyService = {
  getCompanyIdByName: () => {

  }
}
const kafka = {
  createProducer: () => {

  }
}

const createProducerStub = sandbox.stub(kafka, 'createProducer')

createProducerStub.callsFake((args) => {
  return;
})



const createEmployeeStub = sandbox.stub(employeeDbMethods, 'createEmployeeDb')

createEmployeeStub.callsFake((args) => {
  console.log("args createmployee", args);

  expect(args).deep.equal({
    name: this.name,
    emailAddress: this.email,
    designation: this.designation,
    companyId: this.companyId,
    contactNo: this.contactNo,
    address: this.address,
    password: this.password,
    isVarified: this.isVarified
  })
  return { "id": '1' };
})

const getCompanyIdByNameStub = sinon.stub(companyService, 'getCompanyIdByName');

getCompanyIdByNameStub.callsFake((args) => {
  expect(args).deep.equal({
    companyName: this.companyName
  })
  this.companyId = '1234';
  return this.companyId
})


Given('Employee details companyName:{string}, email:{string} , designation:{string} , companyName:{string}, contactNo:{string}, address:{string}, password:{string}, isVerified:{string} to create new employee', (name, email, designation, companyName, contactNo, address, password, isVarified) => {

  console.log("\nIn Given:")
  console.log(name);
  console.log(email)
  console.log(companyName);
  console.log(contactNo);
  console.log(address);
  console.log(designation);
  console.log(password);
  console.log(isVarified);

  this.name = name || undefined;
  this.email = email || undefined;
  this.designation = designation || undefined;
  this.companyName = companyName || undefined;
  this.contactNo = contactNo || undefined;
  this.address = address || undefined;
  this.password = password || undefined;
  this.isVarified = isVarified || undefined;

})

When('Try to create new employee', async () => {
  const insertEmployee = makeInsertEmployee({
    createEmployeeDb: employeeDbMethods.createEmployeeDb,
    ValidationError: exception.ValidationError,
    getCompanyIdByName: companyService.getCompanyIdByName,
    Joi,
    createProducer: kafka.createProducer
  });

  try {
    this.result = await insertEmployee({
      name: this.name,
      emailAddress: this.email,
      designation: this.designation,
      companyName: this.companyName,
      contactNo: this.contactNo,
      address: this.address,
      password: this.password,
      isVarified: this.isVarified
    });
  }
  catch (e) {
    this.error = {
      name: e.name,
      message: e.message,
    };
  }
});

Then('It will throw error:{string} with message:"{string}" while creating new employee', (error, message) => {
  expect(this.error).deep.equal({
    name: error,
    message,
  });
});

Then('It will create new employee with details:"{string}"', (newEmployeeDetails) => {
  console.log(this.result);
  console.log(newEmployeeDetails)
  expect(this.result).deep.equal(JSON.parse(newEmployeeDetails))
});