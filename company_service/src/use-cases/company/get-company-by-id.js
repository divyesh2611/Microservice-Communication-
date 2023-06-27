module.exports = function makeGetCompanyByIdUsecase({
    getCompanyDb,
    Joi,
    ValidationError
}) {
    return async function getCompanyByIdUsecase({
        id
    }) {
        console.log("getCompanyByIdUsecase");

        //joi validation for validate data

        validateInputData({ id });

        //dataaccess call to get one company detials

        const result = await getCompanyDb({ id })
        return result;
    }
    function validateInputData({ id }) {
        const schema = Joi.object({
            id: Joi.string().guid({ version: 'uuidv4' }).required(),
        });
        const { error } = schema.validate({ id });
        if (error) {
            console.log(error.details[0].message)
            throw new ValidationError(error.details[0].message);
        }
    }
}