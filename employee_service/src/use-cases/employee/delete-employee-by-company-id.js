module.exports = function makeDeleteEmployeeByCompanyId({
    deleteEmployeeByCompanyIdDb,
    Joi,
    ValidationError
}) {
    return async function deleteEmployeeByCompanyId({
        companyId
    }) {
        console.log("deleteEmployeeByCompanyIdUsecase")
        validateInputData({ companyId });
        return await deleteEmployeeByCompanyIdDb({ companyId });
    }
    function validateInputData({ companyId }) {
        const schema = Joi.object({
            companyId: Joi.string().guid({ version: 'uuidv4' }).required(),
        });
        const { error } = schema.validate({ companyId });
        if (error) {
            console.log(error.details[0].message)
            throw new ValidationError(error.details[0].message);
        }
    }
}