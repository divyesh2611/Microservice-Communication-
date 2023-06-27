const makeGetRoleId = require('./get-role-id');
const dbMethods = require('../../data-access');
const Joi = require('joi')
const exception = require('../../exceptions');

const getRoleId = makeGetRoleId({
    getRoleIdDb: dbMethods.employeeRoleAssociationDbMethod.getRoleId,
    Joi,
    ValidationError: exception.ValidationError
})

const makeAssignRole = require('./assign-role');
const assignRole = makeAssignRole({
    assignRoleDb: dbMethods.employeeRoleAssociationDbMethod.assignRole,
    Joi,
    ValidationError: exception.ValidationError
})
module.exports = {
    makeGetRoleId,
    getRoleId,
    assignRole
}