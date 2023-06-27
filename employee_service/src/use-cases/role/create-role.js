module.exports = function makeCreateRole({
    createRoleDb,
    Joi,
    ValidationError
}) {
    return async function createRole({
        permission, roleName, isMaster, companyId
    }) {
        console.log("permission", typeof permission, permission);
        console.log("roleName", roleName);
        console.log("isMaster", isMaster);
        console.log("companyId", companyId);
        validateInputData({ permission: permission, roleName, isMaster, companyId });
        return await createRoleDb({ permission, roleName, isMaster, companyId });
    }

    function validateInputData({ permission, roleName, isMaster, companyId }) {
        if (typeof permission != 'string') {
            permission = JSON.stringify(permission);
        }
        const schema = Joi.object({
            roleName: Joi.string().required(),
            companyId: Joi.string().guid({ version: 'uuidv4' }).required(),
            permission: Joi.string().required(),
            isMaster: Joi.boolean().required()
        });
        const { error } = schema.validate({ permission, roleName, isMaster, companyId });
        if (error) {
            console.log("error", error.details[0].message)
            throw new ValidationError(error.details[0].message);
        }
    }
}