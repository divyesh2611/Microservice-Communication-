module.exports = function makeCheckCompanyName({
    checkCompanyNameDb,
    Joi,
    ValidationError,
}) {
    return async function checkCompanyName({
        name
    }) {
        //joi validations for validate data
        console.log("checkCompanyNameUsecase", name);
        await validateInputData({ name });

        //dataaccess call for checking company name

        return await checkCompanyNameDb({ name });

    }
    function validateInputData({ name }) {
        const schema = Joi.object({
            name: Joi.string().required(),
        });
        const { error } = schema.validate({ name });
        // console.log(error.details[0].message)
        if (error) {
            throw new ValidationError(error.details[0].message);
        }
    }
}