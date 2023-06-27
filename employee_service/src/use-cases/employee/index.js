const dbMethods = require('../../data-access');
const Joi = require('joi');
const axios = require('axios');
const { v4: uuidv4 } = require('uuid');
const satelize = require('satelize');

const exceptions = require('../../exceptions');
const { getCompanyIdByName } = require('../../internal-service-call/company-service');
const { createProducer } = require('../kafka');
const jwt = require('jsonwebtoken');
const { config } = require('../../config');


const makeCreateEmployee = require('./create-employee');
const createEmployee = makeCreateEmployee({
    createEmployeeDb: dbMethods.employeeDbMethods.createEmployee,
    Joi,
    getCompanyIdByName,
    ValidationError: exceptions.ValidationError,
    createProducer
})
const makeUpdateEmployeePatch = require('./update-employee-patch');
const UpdateEmployeePatch = makeUpdateEmployeePatch({
    updateEmployeeDb: dbMethods.employeeDbMethods.updateEmployee,
    Joi,
    ValidationError: exceptions.ValidationError
})
const makeDeleteEmployee = require('./delete-employee');
const deleteEmployee = makeDeleteEmployee({
    deleteEmployeeDb: dbMethods.employeeDbMethods.deleteEmployee,
    Joi,
    ValidationError: exceptions.ValidationError
})
const makeGetEmployeeById = require('./get-employee-by-id');
const getEmployeeById = makeGetEmployeeById({
    getEmployeeDb: dbMethods.employeeDbMethods.getEmployee,
    Joi,
    ValidationError: exceptions.ValidationError

})
const makeGetAllEmployee = require('./get-all-employee');
const getAllEmployee = makeGetAllEmployee({
    getAllEmployeeDb: dbMethods.employeeDbMethods.getAllEmployee,
})
const makeDeleteEmployeeByCompanyId = require('./delete-employee-by-company-id');
const deleteEmployeeByCompanyId = makeDeleteEmployeeByCompanyId({
    deleteEmployeeByCompanyIdDb: dbMethods.employeeDbMethods.deleteEmployeeByCompanyId,
    Joi,
    ValidationError: exceptions.ValidationError

})
const makeGetEmployeeByCompanyId = require('./get-employee-by-company-id');
const getEmployeeByCompanyId = makeGetEmployeeByCompanyId({
    getEmployeeByCompanyIdDb: dbMethods.employeeDbMethods.getEmployeeByCompanyId,
    Joi,
    ValidationError: exceptions.ValidationError

})
const makeEmployeeVerificationByEmail = require('./employee-verification-by-email');
const employeeVerificationByEmail = makeEmployeeVerificationByEmail({
    updateEmployeeVerificationDb: dbMethods.employeeDbMethods.updateEmployeeVerification,
    jwt,
    Jwt_Secret_Key: config.Jwt_Secret_Key
})
const makeLoginEmployee = require('./login-employee');
const loginEmployee = makeLoginEmployee({
    insertAccessTokenDb: dbMethods.authDbMethod.insertAccessToken,
    getEmployeeByEmailDb: dbMethods.employeeDbMethods.getEmployeeByEmail,
    jwt,
    uuidv4,
    Joi,
    Jwt_Secret_Key: config.Jwt_Secret_Key,
    ValidationError: exceptions.ValidationError
})
const makeGetEmployeeLocation = require('./get-employee-location');
const getEmployeeLocation = makeGetEmployeeLocation({
    Joi,
    axios,
    satelize,
    Geolocation_Api_Key: config.Geolocation_Api_Key
})
const makeGetEmployeeLoginActivity = require('./get-employee-login-activity');
const getEmployeeLoginActivity = makeGetEmployeeLoginActivity({
    getEmployeeLoginActivitySearchDb: dbMethods.authDbMethod.getEmployeeLoginActivitySearch,
    Joi,
    ValidationError: exceptions.ValidationError
})

const makeFilterEmployeeLoginActivity = require('./filter-employee-login-activity');
const filterEmployeeLoginActivity = makeFilterEmployeeLoginActivity({
    getEmployeeLoginActivityDb: dbMethods.authDbMethod.getEmployeeLoginActivity,
    Joi,
    ValidationError: exceptions.ValidationError
})
const makeGetOrderByEmployeeLoginActivity = require('./get-order-by-employee-login-activity');
const getOrderByEmployeeLoginActivity = makeGetOrderByEmployeeLoginActivity({
    getOrderByEmployeeLoginActivityDb: dbMethods.authDbMethod.getOrderByEmployeeLoginActivity,
    Joi,
    ValidationError: exceptions.ValidationError
})
const makeDeleteEmployeeLoginActivity = require('./delete-employees-login-activity');
const deleteEmployeeLoginActivity = makeDeleteEmployeeLoginActivity({
    deleteEmployeeLoginActivityDb: dbMethods.authDbMethod.deleteEmployeeLoginActivity,
    ValidationError: exceptions.ValidationError,
    Joi
})
const makeUpdateEmployeePut = require('./update-employee-put');
const updateEmployeePut = makeUpdateEmployeePut({
    updateEmployeePut: dbMethods.employeeDbMethods.updateEmployeePut
})
module.exports = Object.freeze({
    createEmployee,
    deleteEmployee,
    UpdateEmployeePatch,
    getAllEmployee,
    getEmployeeById,
    deleteEmployeeByCompanyId,
    getEmployeeByCompanyId,
    employeeVerificationByEmail,
    loginEmployee,
    getEmployeeLocation,
    getEmployeeLoginActivity,
    filterEmployeeLoginActivity,
    getOrderByEmployeeLoginActivity,
    deleteEmployeeLoginActivity,
    updateEmployeePut
})
