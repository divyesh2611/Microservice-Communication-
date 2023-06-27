
module.exports = function makeGetEmployeeLoginActivity({
    getEmployeeLoginActivitySearchDb,
    Joi,
    ValidationError
}) {
    return async function getEmployeeLoginActivity({
        id, searchField, dataField
    }) {
        console.log("****getEmployeeLoginActivityUsecase******");
        console.log("id", id);
        console.log("search", searchField);
        console.log("data", dataField);

        validateInputDate({ id, searchField, dataField });

        let result = await getEmployeeLoginActivitySearchDb({ id, searchField, dataField });

        return result;
    }

    function validateInputDate({ id, dataField, searchField }) {
        const schema = Joi.object({
            id: Joi.string().guid({ version: 'uuidv4' }).required(),
            searchField: Joi.string().required(),
            dataField: Joi.string().required()
        });
        const { error } = schema.validate({ id, dataField, searchField });
        if (error) {
            console.log(error.details[0].message)
            throw new ValidationError(error.details[0].message);
        }
    }
}