module.exports = function makeDeleteRole({
    deleteRoleDb,
    Joi,
    ValidationError
}) {
    return async function deleteRole({
        roleId
    }) {

        validateInputData({ roleId });


        return await deleteRoleDb({ roleId });
    }
    function validateInputData({ roleId }) {
        const schema = Joi.object({
            roleId: Joi.string().guid({ version: 'uuidv4' }).required(),
        });
        const { error } = schema.validate({ roleId });
        if (error) {
            console.log("error", error.details[0].message)
            throw new ValidationError(error.details[0].message);
        }
    }
}