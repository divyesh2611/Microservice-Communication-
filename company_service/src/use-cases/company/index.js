const dbMethods = require('../../data-access');
const Joi = require('joi');
const exceptions = require('../../exceptions');
const { createProducer } = require('../kafka');
const employeeServices = require('../../internal-service-call/employee-service');


const makeCreateOwnerEmployee = require('./create-owner-employee');
const createOwnerEmployee = makeCreateOwnerEmployee({
    createEmployeeService: employeeServices.createEmployee,
    createMasterRoleService: employeeServices.createMasterRole,
    assingMasterRoleService: employeeServices.assingMasterRole
})

const makeCheckCompanyName = require('./check-company-name');
const checkCompanyName = makeCheckCompanyName({
    checkCompanyNameDb: dbMethods.companyDbMethods.checkCompanyName,
    Joi,
    createOwnerEmployee,
    ValidationError: exceptions.ValidationError,
})
console.log("exceptions.ValidationError", exceptions.ValidationError)
const makeCreateCompany = require('./create-company');
const createCompany = makeCreateCompany({
    createCompanyDb: dbMethods.companyDbMethods.createCompany,
    checkCompanyName,
    Joi,
    ValidationError: exceptions.ValidationError,
    ForbiddenError: exceptions.ForbiddenError,

})
const makeUpdateCompany = require('./update-company');
const updateCompany = makeUpdateCompany({
    updateCompanyDb: dbMethods.companyDbMethods.updateCompany,
    Joi,
    ValidationError: exceptions.ValidationError,

})
const makeDeleteCompany = require('./delete-company');
const deleteCompany = makeDeleteCompany({
    deleteCompanyDb: dbMethods.companyDbMethods.deleteCompany,
    Joi,
    deleteEmployeeService: employeeServices.deleteEmployee,
    ValidationError: exceptions.ValidationError,
    createProducer
})
const makeGetCompanyById = require('./get-company-by-id');
const getCompanyById = makeGetCompanyById({
    getCompanyDb: dbMethods.companyDbMethods.getCompany,
    Joi,
    ValidationError: exceptions.ValidationError,
})
const makeGetAllCompany = require('./get-all-company');
const getAllCompany = makeGetAllCompany({
    getAllCompanyDb: dbMethods.companyDbMethods.getAllCompany,
})
const makeGetCompanyIdByName = require('./get-company-id-by-name')
const getCompanyIdByName = makeGetCompanyIdByName({
    getCompanyIdByNameDb: dbMethods.companyDbMethods.getCompanyIdByName,
    Joi,
    ValidationError: exceptions.ValidationError,
})




module.exports = Object.freeze({
    createCompany,
    deleteCompany,
    updateCompany,
    getAllCompany,
    getCompanyById,
    getCompanyIdByName,
    checkCompanyName,
    createOwnerEmployee
})

