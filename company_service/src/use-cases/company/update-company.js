module.exports = function makeUpdateCompany({
    updateCompanyDb,
    Joi,
    ValidationError,
}) {
    return async function updateCompany({
        updateData, id
    }) {
        console.log(typeof updateData);
        console.log("updateCompanyUsecase", updateData, id);
        //joi validation for validate data
        validateId({ id });
        validateUpdateData(updateData);

        //dataaccess call for update company details
        const update = makeUpdateQuery(updateData, id);
        console.log("updatedquery", update)

        const result = await updateCompanyDb({ updateQuery: update.updateQuery, updateParams: update.updateParams });
        return result;
    }

    function makeUpdateQuery(updateData, id) {
        let updateParams = [];
        let updateQuery = "";
        let paramsIndex = 2;
        Object.entries(updateData).forEach(([key, value], index) => {
            updateQuery += `${key} == $${paramsIndex}`;
            updateParams.push(value);
            paramsIndex++;
            if (index < Object.entries(updateData).length - 1) {
                updateQuery += ', ';
            }
        });
        updateQuery += ' WHERE id = $1';
        updateParams.unshift(id);
        return {
            updateQuery,
            updateParams
        }
    }

    function validateUpdateData(validateData) {

        console.log("validatedata", validateData);
        for (let key in validateData) {
            console.log("key", key)
            if (key == 'id')
                validateId({ id: validateData[key] });
            else if (key == 'name') {
                validateName({ name: validateData[key] });
            }
            else if (key == 'city')

                validateCity({ city: validateData[key] });
            else if (key == 'emailAddress')
                validateEmailAddress({ emailAddress: validateData[key] });
            else if (key == 'foundedYear')
                validateFoundedYear({ foundedYear: validateData[key] });
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

    function validateCity({ city }) {
        const schema = Joi.object({
            city: Joi.string().required(),
        });
        const { error } = schema.validate({ city });
        if (error) {
            console.log(error.details[0].message)
            throw new ValidationError(error.details[0].message);
        }
    }

    function validateEmailAddress({ emailAddress }) {
        const schema = Joi.object({
            emailAddress: Joi.string().email().required(),
        });
        const { error } = schema.validate({ emailAddress });
        if (error) {
            console.log(error.details[0].message)
            throw new ValidationError(error.details[0].message);
        }
    }

    function validateName({ name }) {
        console.log("name")
        const schema = Joi.object({
            name: Joi.string().min(2).required(),
        });
        const { error } = schema.validate({ name });
        if (error) {
            console.log(error.details[0].message)
            throw new ValidationError(error.details[0].message);
        }
    }

    function validateFoundedYear({ foundedYear }) {
        console.log("foundedyear", typeof foundedYear)
        const schema = Joi.object({
            foundedYear: Joi.number().integer().min(1800).max(2100).strict().required()
        });
        const { error } = schema.validate({ foundedYear });
        if (error) {
            console.log("error.details[0].message", error.details[0].message)
            throw new ValidationError(error.details[0].message);
        }
    }
}