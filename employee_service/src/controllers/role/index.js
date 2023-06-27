const useCase = require('../../use-cases');

const makeAssingRoleAction = require('./assing-role');
const assingRoleAction = makeAssingRoleAction({
    assingRole: useCase.employeeRoleAssociation.assingRole
})
const makeCreateRoleAction = require('./create-role');
const createRoleAction = makeCreateRoleAction({
    createRole: useCase.role.createRole
})
const makeGetRoleByIdAction = require('./get-role-by-id');
const getRoleByIdAction = makeGetRoleByIdAction({
    getRoleById: useCase.role.getRoleById
})
const makeDeleteRoleAction = require('./delete-role');
const deleteRoleAction = makeDeleteRoleAction({
    deleteRole: useCase.role.deleteRole
})
const makeUpdateRoleAction = require('./update-role');
const updateRoleAction = makeUpdateRoleAction({
    updateRole: useCase.role.updateRole
})
const makeCreateMasterRoleAction = require('./create-master-role');
const createMasterRoleAction = makeCreateMasterRoleAction({
    createMasterRole: useCase.role.createMasterRole
})

module.exports = {
    createRoleAction,
    assingRoleAction,
    getRoleByIdAction,
    deleteRoleAction,
    updateRoleAction,
    createMasterRoleAction
}