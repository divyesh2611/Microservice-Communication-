const dbMethods = require("../../data-access");
const exception = require('../../exceptions');
const Joi = require('joi');

const makeGetRoleById = require('./get-role');
const getRoleById = makeGetRoleById({
    getRoleByIdDb: dbMethods.roleDbMethode.getRoleById,
    ValidationError: exception.ValidationError,
    Joi
})
const makeCreateRole = require('./create-role');
const createRole = makeCreateRole({
    createRoleDb: dbMethods.roleDbMethode.createRole,
    ValidationError: exception.ValidationError,
    Joi
})

const makeDeleteRole = require('./delete-role');
const deleteRole = makeDeleteRole({
    deleteRoleDb: dbMethods.roleDbMethode.deleteRole,
    Joi,
    ValidationError: exception.ValidationError
})
const makeUpdateRole = require('./update-role');
const updateRole = makeUpdateRole({
    updateRoleDb: dbMethods.roleDbMethode.updateRole,
    Joi,
    ValidationError: exception.ValidationError
})
const makeCreateMasterRole = require('./create-master-role');
const createMasterRole = makeCreateMasterRole({
    createRole,
    Joi,
    ValidationError: exception.ValidationError
})
module.exports = {
    getRoleById,
    createRole,
    deleteRole,
    updateRole,
    createMasterRole
}