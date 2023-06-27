module.exports = function makeGetEmployeeByCompanyId({
    getEmployeeByCompanyIdDb,
    Joi,
    ValidationError
}) {
    return async function getEmployeeByCompanyId({
        companyId
    }) {
        console.log('getEmployeeByCompanyIdUsecase');
        validateInputData({ companyId });

        const result = await getEmployeeByCompanyIdDb({ companyId })
        return result;
    }
    function validateInputData({ companyId }) {
        const schema = Joi.object({
            companyId: Joi.string().guid({ version: 'uuidv4' }).required()
        });
        const { error } = schema.validate({ companyId });
        if (error) {
            console.log(error.details[0].message);
            throw new ValidationError(error.details[0].message);
        }
    }
}