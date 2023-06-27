module.exports = function makeGetEmployeeById({
    getEmployeeDb,
    Joi,
    ValidationError
}) {
    return async function getEmployeeById({
        id,
    }) {
        console.log("getEmployeeByIdUsecase", id)
        validateGetEmployeeById({ id });

        const result = await getEmployeeDb({ id })
        return result;
    }
    function validateGetEmployeeById({ id }) {
        const schema = Joi.object({
            id: Joi.string().guid({ version: 'uuidv4' }).required()
        });
        const { error } = schema.validate({ id });
        if (error) {
            throw new ValidationError(error.details[0].message);
        }
    }
}