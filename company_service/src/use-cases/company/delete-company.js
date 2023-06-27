module.exports = function makeDeleteCompany({
    deleteCompanyDb,
    Joi,
    deleteEmployee,
    ValidationError,
    createProducer
}) {
    return async function deleteCompany({
        id
    }) {
        console.log("deleteCompanyUsecase", id)

        //joi validations for validate data

        validateInputData({ id });

        //delete those employee who have this company id

        await deleteEmployee({ id });
        await createProducer({ topic: 'delete-employee', message: id })
        return await deleteCompanyDb({ id });
    }
    function validateInputData({ id }) {
        const schema = Joi.object({
            id: Joi.string().guid({ version: 'uuidv4' }).required(),
        });
        const { error } = schema.validate({ id });

        if (error) {
            console.log(error.details[0].message);
            throw new ValidationError(error.details[0].message);
        }
    }
}