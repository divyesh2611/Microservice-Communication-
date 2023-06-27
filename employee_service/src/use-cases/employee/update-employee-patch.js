const employee = require(".");

module.exports = function makeUpdateEmployeePatch({
    updateEmployeeDb,
    Joi,
    ValidationError
}) {
    return async function UpdateEmployeePatch({
        updateData, id
    }) {
        validateId({ id });
        validateUpdateData(updateData);
        const update = makeUpdateQuery(updateData, id);
        return await updateEmployeeDb({ updateQuery: update.updateQuery, updateParams: update.updateParams });

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
            else if (key == 'name')
                validateName({ name: validateData[key] });
            else if (key == 'address')
                validateAddress({ address: validateData[key] });
            else if (key == 'emailAddress')
                validateEmailAddress({ emailAddress: validateData[key] });
            else if (key == 'contactNo')
                validateContactno({ contactNo: validateData[key] });
            else if (key == 'password')
                validatePassword({ password: validateData[key] });
            else if (key == 'designation')
                validateDesignation({ designation: validateData[key] });
            else if (key == 'isVerified')
                validateIsVerified({ isVerified: validateData[key] });
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

    function validateAddress({ address }) {
        const schema = Joi.object({
            address: Joi.string().required(),
        });
        const { error } = schema.validate({ address });
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

    function validateContactno({ contactNo }) {
        const schema = Joi.object({
            contactNo: Joi.number().integer().min(1000000000).max(9999999999).required(),
        });
        const { error } = schema.validate({ contactNo });
        if (error) {
            console.log(error.details[0].message)
            throw new ValidationError(error.details[0].message);
        }
    }

    function validatePassword({ password }) {
        const schema = Joi.object({
            password: Joi.string().min(5).max(30).pattern(new RegExp('[a-zA-Z0-9]{3,30}$')).required()
        });
        const { error } = schema.validate({ password });
        if (error) {
            console.log(error.details[0].message)
            throw new ValidationError(error.details[0].message);
        }
    }

    function validateIsVerified({ isVerified }) {
        console.log()
        const schema = Joi.object({
            isVerified: Joi.boolean().required(),
        });
        const { error } = schema.validate({ isVerified });
        if (error) {
            console.log(error.details[0].message)
            throw new ValidationError(error.details[0].message);
        }
    }

    function validateDesignation({ designation }) {
        console.log("validateDesignation", designation);
        const schema = Joi.object({
            designation: Joi.string().required(),
        });
        const { error } = schema.validate({ designation });
        if (error) {
            console.log(error.details[0].message)
            throw new ValidationError(error.details[0].message);
        }
    }
}