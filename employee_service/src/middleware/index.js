const jwt = require('jsonwebtoken');
const dbMethods = require('../data-access');
const { config } = require('../config');
const util = require("util");
const multer = require("multer");
const useCase = require('../use-cases');
const permissionsObj = require('../utilities/enum');

const makeVerifyAccessToken = require('./verifyAccessToken');
const verifyAccessToken = makeVerifyAccessToken({
    jwt,
    getDataByEmployeeId: dbMethods.authDbMethod.getDataByEmployeeId,
    updateExpirationTime: dbMethods.authDbMethod.updateExpirationTime,
    Jwt_Sceret_Key: config.Jwt_Secret_Key
})
const makeCheckPermission = require('./checkPermission');
const checkPermission = makeCheckPermission({
    permissionsObj,
    getRoleId: useCase.employeeRoleAssociation.getRoleId,
    getRoleById: useCase.role.getRoleById
})


module.exports = Object.freeze({
    verifyAccessToken,
    checkPermission
})