module.exports = function makeCreateCompany({
    createCompanyDb,
    Joi,
    checkCompanyName,
    ValidationError,
    ForbiddenError,
    createOwnerEmployee
}) {
    return async function createCompany({
        name, foundedYear, city, emailAddress, owner
    }) {
        console.log("createCompanyUsecase")
        //joi validation for validate data 

        validateInputData({ name, foundedYear, city, emailAddress, owner });



        //usecase call for checking company name is exiest or not in database
        const createOwner = createOwnerEmployee({ ownerData: owner });
        const isCompanyExist = await checkCompanyName({ name });
        if (isCompanyExist)
            throw new ForbiddenError("company name is already exist");

        const id = await createCompanyDb({ name, foundedYear, city, emailAddress, ownerName: owner.name })
        return {
            createOwner,
            id
        };

    }
    function validateInputData({ name, foundedYear, city, emailAddress, owner }) {
        const schema = Joi.object({
            name: Joi.string().min(5).required(),
            foundedYear: Joi.number().integer().min(1800).max(2100).required(),
            city: Joi.string().required(),
            emailAddress: Joi.string().required(),
            owner: Joi.object({
                name: Joi.string().required(),
                emailAddress: Joi.string().email().required(),
                address: Joi.string().required(),
                designation: Joi.string().required(),
                password: Joi.string().required(),
                isvarified: Joi.boolean().required(),
                contactno: Joi.number().integer().min(1000000000).max(9999999999).required()
            }).required()

        });
        const { error } = schema.validate({ name, foundedYear, city, emailAddress, owner });
        if (error) {
            throw new ValidationError(error.details[0].message);
        }
    }
}