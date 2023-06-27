module.exports = function makeAssignRole({
    assignRoleDb,
    Joi,
    ValidationError
}) {
    return async function assignRole({
        roleId, id
    }) {
        validateInputData({ roleId, id });
        const resutl = await assignRoleDb({ roleId, id });
        return resutl;
    }
    function validateInputData({ roleId, id }) {
        const schema = Joi.object({
            roleId: Joi.string().guid({ version: 'uuidv4' }).required(),
            id: Joi.string().guid({ version: 'uuidv4' }).required()
        });
        const { error } = schema.validate({ roleId, id });
        if (error) {
            console.log("error", error.details[0].message)
            throw new ValidationError(error.details[0].message);
        }
    }
}