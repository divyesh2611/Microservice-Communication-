module.exports = function makeUpdateRole({
    updateRoleDb,
    Joi,
    ValidationError
}) {
    return async function updateRole({
        updateData, roleId
    }) {
        console.log("updaterole", typeof updateData, updateData);
        validateId({ roleId });
        validateUpdateData(updateData);
        const update = makeUpdateQuery(updateData, roleId);
        console.log("update", update);
        return await updateRoleDb({ updateQuery: update.updateQuery, updateParams: update.updateParams });
    }

    function makeUpdateQuery(updateData, roleId) {
        let updateParams = [];
        let updateQuery = "";
        let paramsIndex = 2;
        Object.entries(updateData).forEach(([key, value], index) => {
            updateQuery += `${key} == $${paramsIndex}`;
            if (key == 'permission')
                updateParams.push(JSON.stringify(value));
            else
                updateParams.push(value);
            paramsIndex++;
            if (index < Object.entries(updateData).length - 1) {
                updateQuery += ', ';
            }
        });
        updateQuery += ' WHERE role_id = $1';
        updateParams.unshift(roleId);
        return {
            updateQuery,
            updateParams
        }
    }

    function validateUpdateData(validateData) {

        console.log("validatedata", validateData);
        for (let key in validateData) {
            console.log("key", key)
            if (key == 'roleId')
                validateId({ roleId: validateData[key] });
            else if (key == 'roleName')
                validateRoleName({ roleName: validateData[key] });
            else if (key == 'companyId')
                validateCompanyId({ companyId: validateData[key] });
            else if (key == 'isMaster')
                validateIsMaster({ isMaster: validateData[key] });
            else if (key == 'permission')
                validateNewPermission({ permission: JSON.stringify(validateData[key]) });
        }

    }

    function validateId({ roleId }) {
        console.log("id validateId", roleId)
        const schema = Joi.object({
            roleId: Joi.string().guid({ version: 'uuidv4' }).required(),
        });
        const { error } = schema.validate({ roleId });
        if (error) {
            console.log(error.details[0].message)
            throw new ValidationError(error.details[0].message);
        }
    }

    function validateRoleName({ roleName }) {
        const schema = Joi.object({
            roleName: Joi.string().min(2).max(10).required(),
        });
        const { error } = schema.validate({ roleName });
        if (error) {
            console.log(error.details[0].message)
            throw new ValidationError(error.details[0].message);
        }
    }

    function validateCompanyId({ companyId }) {
        const schema = Joi.object({
            companyId: Joi.string().guid({ version: 'uuidv4' }).required(),
        });
        const { error } = schema.validate({ companyId });
        if (error) {
            console.log(error.details[0].message)
            throw new ValidationError(error.details[0].message);
        }
    }

    function validateIsMaster({ isMaster }) {
        console.log("validateIsMaster", isMaster)
        const schema = Joi.object({
            isMaster: Joi.boolean().required(),
        });
        const { error } = schema.validate({ isMaster });
        if (error) {
            console.log(error.details[0].message)
            throw new ValidationError(error.details[0].message);
        }
    }

    function validateNewPermission({ permission }) {
        if (typeof permission != 'string') {
            permission = JSON.stringify(permission);
        }
        const schema = Joi.object({
            permission: Joi.string().required()
        });
        const { error } = schema.validate({ permission });
        if (error) {
            console.log(error.details[0].message)
            throw new ValidationError(error.details[0].message);
        }
    }

}