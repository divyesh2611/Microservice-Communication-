module.exports = function makeValidateInputData({
    Joi,
    ValidationError
}) {
    function validateInputData(validateData) {

        console.log("validatedata", validateData);
        for (let key in validateData) {
            if (key == 'id')
                validateId({ id: validateData[key] });
            else if (key == 'name') {
                console.log("validation[key]", validateData[key], key);
                validateName({ name: validateData[key] });

            }
            else if (key = 'city')
                validateCity(validateData[key]);
            else if (key = 'emailAddress')
                validateEmailAddress(validateData[key]);
            else if (key = 'foundedYear')
                validateFoundedYear(validateData[key]);
        }

    }

    function validateId({ id }) {
        console.log("id validateId", id)
        const schema = Joi.object({
            id: Joi.string().guid({ version: 'uuidv4' }).required(),
        });
        const { error } = schema.validate({ id });
        if (error) {
            console.log(error.details[0].message)
            throw new ValidationError(error.details[0].message);
        }
    }

    function validateCity(city) {
        const schema = Joi.object({
            city: Joi.string().required(),
        });
        const { error } = schema.validate({ city });
        if (error) {
            console.log(error.details[0].message)
            throw new ValidationError(error.details[0].message);
        }
    }

    function validateEmailAddress(emailAddress) {
        const schema = Joi.object({
            emailAddress: Joi.string().guid({ version: 'uuidv4' }).required(),
        });
        const { error } = schema.validate({ emailAddress });
        if (error) {
            console.log(error.details[0].message)
            throw new ValidationError(error.details[0].message);
        }
    }

    function validateName({ name }) {
        console.log()
        const schema = Joi.object({
            name: Joi.string().required(),
        });
        const { error } = schema.validate({ name });
        if (error) {
            console.log(error.details[0].message)
            throw new ValidationError(error.details[0].message);
        }
    }

    function validateFoundedYear(foundedYear) {
        const schema = Joi.object({
            foundedYear: Joi.number().integer().min(1900).max(2100).required()
        });
        const { error } = schema.validate({ foundedYear });
        if (error) {
            console.log(error.details[0].message)
            throw new ValidationError(error.details[0].message);
        }
    }
}