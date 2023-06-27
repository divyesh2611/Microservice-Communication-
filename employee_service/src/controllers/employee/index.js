const useCase = require('../../use-cases');
const multer = require('multer');

const makeCreateEmployeeAction = require('./create-employee');
const createEmployeeAction = makeCreateEmployeeAction({
    createEmployee: useCase.employee.createEmployee,
})
const makeUpdateEmployeeAction = require('./update-employee');
const updateEmployeeAction = makeUpdateEmployeeAction({
    updateEmployeePatch: useCase.updateEmployeePatch,
    updateEmployeePut: useCase.employee.updateEmployeePut
})
const makeDeleteEmployeeAction = require('./delete-employee');
const deleteEmployeeAction = makeDeleteEmployeeAction({
    deleteEmployee: useCase.employee.deleteEmployee,
})
const makeGetEmployeeByIdAction = require('./get-employee-by-id');
const getEmployeeByIdAction = makeGetEmployeeByIdAction({
    getEmployeeById: useCase.employee.getEmployeeById,
})

const makeGetAllEmployeeAction = require('./get-all-employee');
const getAllEmployeeAction = makeGetAllEmployeeAction({
    getAllEmployee: useCase.employee.getAllEmployee,
})
const makeDeleteEmployeeByCompanyIdAction = require('./delete-employee-by-commpany-id');
const deleteEmployeeByCompanyIdAction = makeDeleteEmployeeByCompanyIdAction({
    deleteEmployeeByCompanyId: useCase.employee.deleteEmployeeByCompanyId,
})
const makeGetEmployeeByCompanyIdAction = require('./get-employee-by-company-id');
const getEmployeeByCompanyIdAction = makeGetEmployeeByCompanyIdAction({
    getEmployeeByCompanyId: useCase.employee.getEmployeeByCompanyId,
})
const makeEmployeeVerificationByEmailAction = require('./employee-verification-by-email');
const employeeVerificationByEmailAction = makeEmployeeVerificationByEmailAction({
    employeeVerificationByEmail: useCase.employee.employeeVerificationByEmail
})
const makeLoginEmployeeAction = require('./login-employee');
const loginEmployeeAction = makeLoginEmployeeAction({
    loginEmployee: useCase.employee.loginEmployee,
    getEmployeeLocation: useCase.employee.getEmployeeLocation

})
const makeGetEmployeeLoginActivityAction = require('./get-employee-login-activity');
const getEmployeeLoginActivityAction = makeGetEmployeeLoginActivityAction({
    getEmployeeLoginActivity: useCase.employee.getEmployeeLoginActivity

})
const makeFilterEmployeeLoginActivityAction = require('./filter-employee-login-activity');
const filterEmployeeLoginActivityAction = makeFilterEmployeeLoginActivityAction({
    filterEmployeeLoginActivity: useCase.employee.filterEmployeeLoginActivity
})
const makeGetOrderByEmployeeLoginActivityAction = require('./get-order-by-employee-login-activity');
const getOrderByEmployeeLoginActivityAction = makeGetOrderByEmployeeLoginActivityAction({
    getOrderByEmployeeLoginActivity: useCase.employee.getOrderByEmployeeLoginActivity
})
const makeDeleteEmployeeLoginActivityAction = require('./delete-employee-login-activity');
const deleteEmployeeLoginActivityAction = makeDeleteEmployeeLoginActivityAction({
    deleteEmployeeLoginActivity: useCase.employee.deleteEmployeeLoginActivity
})



module.exports = Object.freeze({
    getEmployeeByIdAction,
    getAllEmployeeAction,
    createEmployeeAction,
    updateEmployeeAction,
    deleteEmployeeAction,
    deleteEmployeeByCompanyIdAction,
    getEmployeeByCompanyIdAction,
    employeeVerificationByEmailAction,
    loginEmployeeAction,
    getEmployeeLoginActivityAction,
    filterEmployeeLoginActivityAction,
    getOrderByEmployeeLoginActivityAction,
    deleteEmployeeLoginActivityAction,
})