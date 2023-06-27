module.exports = function makeDeleteEmployeeLoginActivity({
    deleteEmployeeLoginActivityDb,
    ValidationError,
    Joi
}) {
    return async function deleteEmployeeLoginActivity({
        authIds
    }) {
        console.log("deleteEmployeeLoginActivity", authIds)
        if (!authIds) {
            throw new ValidationError('\"authIds" is required');
        }


        for (let i = 0; i < authIds?.length; i++) {
            const authIdsType = typeof authIds[i];
            let id;
            console.log("authid", authIds[i].id)
            validateInputDate({ authId: authIds[i].id });
            await deleteEmployeeLoginActivityDb({ authId: authIds[i].id });
        }
        return 'employees login activity is deleted';
    }

    function validateInputDate({ authId }) {

        const schema = Joi.object({
            authId: Joi.string().guid({ version: 'uuidv4' }).required()
        });
        const { error } = schema.validate({ authId });
        if (error) {
            console.log(error.details[0].message)
            throw new ValidationError(error.details[0].message);
        }
    }
}