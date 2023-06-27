module.exports = function makeCreateEmployee({
    createEmployeeDb,
    Joi,
    getCompanyIdByName,
    ValidationError,
    createProducer
}) {
    return async function createEmployee({
        name, contactNo, address, designation, companyName, password, emailAddress, isVarified
    }) {
        console.log("creteEmployeeUsecase", name, contactNo, address, designation, companyName, password, emailAddress, isVarified);
        validateInputData({ name, contactNo, address, designation, companyName, password, emailAddress });

        //api call to get company id from companyname 

        const companyId = await getCompanyIdByName({ companyName });
        console.log("companyId", companyId);

        const id = await createEmployeeDb({ name, contactNo, address, designation, companyId, password, emailAddress, isVarified })
        await createProducer({ topic: 'send-email', message: { emailAddress, companyName, id } });
        console.log("id", id);

        return id;
    }
    function validateInputData({ name, contactNo, address, designation, companyName, password, emailAddress }) {
        const schema = Joi.object({
            name: Joi.string().min(5).required(),
            contactNo: Joi.number().integer().min(1000000000).max(9999999999).required(),
            address: Joi.string().required(),
            designation: Joi.string().max(10).required(),
            companyName: Joi.string().required(),
            emailAddress: Joi.string().email().required(),
            password: Joi.string().min(3).max(30).pattern(new RegExp('[a-zA-Z0-9]{3,30}$')).required()
        });
        const { error } = schema.validate({ name, contactNo, address, designation, companyName, password, emailAddress });
        if (error) {
            console.log("error", error.details[0].message)
            throw new ValidationError(error.details[0].message);
        }
    }
}