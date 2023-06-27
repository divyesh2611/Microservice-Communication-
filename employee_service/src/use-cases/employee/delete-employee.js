module.exports = function makeDeleteEmployee({
    deleteEmployeeDb,
    Joi,
    ValidationError
}) {
    return async function deleteEmployee({
        id
    }) {
        validateInputDate({ id });

        const result = await deleteEmployeeDb({ id })
        return result;
    }
    function validateInputDate({ id }) {
        const schema = Joi.object({
            id: Joi.string().guid({ version: 'uuidv4' }).required()
        });
        const { error } = schema.validate({ id });
        if (error) {
            console.log(error.details[0].message)
            throw new ValidationError(error.details[0].message);
        }
    }
}