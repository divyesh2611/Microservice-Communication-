module.exports = function makeCreateOwnerEmployee({
    createEmployeeService,
    createMasterRoleService,
    assingMasterRoleService
}) {
    return async function createOwnerEmployee({
        ownerData
    }) {
        const resEmployee = await createEmployeeService({ ownerData });
        const ownerId = resEmployee.data.employeeid;
        const resRole = await createMasterRoleService({ companyId: ownerData.companyId });
        const roleId = resRole.data.roleId;
        const result = await assingMasterRoleService({ ownerId, roleId });
        return 'owner is created !';
    }
}