module.exports = function makeGetRoleId({
    getRoleIdDb,
    Joi,
    ValidationError
}) {
    return async function getRoleId({
        id
    }) {
        console.log("getRoleId", id);
        validateInputData({ id });
        return await getRoleIdDb({ id });

    }
    function validateInputData({ id }) {
        const schema = Joi.object({
            id: Joi.string().guid({ version: 'uuidv4' }).required()
        });
        const { error } = schema.validate({ id });
        if (error) {
            console.log("error", error.details[0].message)
            throw new ValidationError(error.details[0].message);
        }
    }
}