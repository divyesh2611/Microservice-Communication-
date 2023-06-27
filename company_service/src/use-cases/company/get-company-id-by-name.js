module.exports = function makeGetCompanyIdByName({
    getCompanyIdByNameDb,
    Joi,
    ValidationError
}) {
    return async function getCompanyIdByName({
        name
    }) {
        console.log("getCompanyIdByNameUsacase");

        //joi validation for validate data

        validateInputData({ name });

        //dataaccess call for get company id
        const resutl = await getCompanyIdByNameDb({ name });
        console.log("result", resutl);
        return resutl;

    }
    function validateInputData({ name }) {
        const schema = Joi.object({
            name: Joi.string().required(),
        });
        const { error } = schema.validate({ name });
        if (error) {
            console.log(error.details[0].message)
            throw new ValidationError(error.details[0].message);
        }
    }
}
