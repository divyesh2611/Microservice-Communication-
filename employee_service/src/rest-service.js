const express = require('express');
const controllers = require('./controllers');
const { verifyAccessToken } = require('./middleware');
const { checkPermission } = require('./middleware');
const router = express.Router();
const upload = require('./middleware/upload-file-process')

function init() {
    initEmployeeRoutes();
    employeeLoginActivity();
    EmployeeFile();
    employeeRole();
}
function initEmployeeRoutes() {
    router.post('/employee', controllers.employee.createEmployeeAction)
    router.get('/employee', verifyAccessToken, checkPermission, controllers.employee.getAllEmployeeAction);
    router.get('/employee/id', verifyAccessToken, checkPermission, controllers.employee.getEmployeeByIdAction)
    router.delete('/employee', verifyAccessToken, checkPermission, controllers.employee.deleteEmployeeAction)
    router.patch('/employee/:id', verifyAccessToken, checkPermission, controllers.employee.updateEmployeeAction)
    router.delete('/employee/v1/:companyid', controllers.employee.deleteEmployeeByCompanyIdAction)
    router.get('/employee/v1/:companyid', verifyAccessToken, controllers.employee.getEmployeeByCompanyIdAction)
    router.get('/employee/verify/:verificationToken', controllers.employee.employeeVerificationByEmailAction)
    router.get('/employee/login/v1', controllers.employee.loginEmployeeAction);
}

function employeeRole() {
    router.post('/emloyee/role', verifyAccessToken, checkPermission, controllers.role.createRoleAction);
    router.post('/employee/role/assing', verifyAccessToken, checkPermission, controllers.role.assingRoleAction);
    router.get('/employee/role/:roleid', verifyAccessToken, checkPermission, controllers.role.getRoleByIdAction);
    router.delete('/employee/role/:roleid', verifyAccessToken, checkPermission, controllers.role.deleteRoleAction);
    router.patch('/employee/role/:roleid', verifyAccessToken, checkPermission, controllers.role.updateRoleAction);
    router.post('/employee/role/master', verifyAccessToken, checkPermission, controllers.role.createMasterRoleAction)
}

function EmployeeFile() {
    router.post('/employee/file/upload', verifyAccessToken, checkPermission, upload.single('file'), controllers.file.fileUploadAction);
    router.get('/employee/file/download/:filename', verifyAccessToken, checkPermission, controllers.file.fileDwonloadAction);
    router.delete('/employee/file/delete/:filename', verifyAccessToken, checkPermission, controllers.file.fileDeleteAction);
}
function employeeLoginActivity() {
    router.get('/employee/loginactivity/:search/:data', verifyAccessToken, checkPermission, controllers.employee.getEmployeeLoginActivityAction);
    router.get('/employee/loginactivity/filter', verifyAccessToken, checkPermission, controllers.employee.filterEmployeeLoginActivityAction);
    router.get('/employee/loginactivity/orderby', verifyAccessToken, checkPermission, controllers.employee.getOrderByEmployeeLoginActivityAction);
    router.post('/employee/loginactivity/delete', verifyAccessToken, checkPermission, controllers.employee.deleteEmployeeLoginActivityAction);
}
init();
module.exports = router;


