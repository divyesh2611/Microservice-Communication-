module.exports = function makeCreateMasterRole({
    createRole,
    Joi,
    ValidationError
}) {
    return async function createMasterRole({
        companyId
    }) {

        validateInputData({ companyId });


        const permissions = {
            'getLoginActivity': true,
            'createLoginginActivity': true,
            'deleteLoginActivity': true,
            'filterLoginActvity': true,
            'orderLoginActivity': true,
            'searchLoginActivty': true,
            'getEmployee': true,
            'getEmployeeById': true,
            'createRole': true,
            'assingRole': true,
            'getRole': true,
            'deleteRole': true,
            'updateRole': true,
            'deleteEmployee': true,
            'deleteEmployeeByCompanyId': true,
            'getEmployeeByCompanyId': true,
        };

        return await createRole({ permissions, companyId, isMaster: true, roleName: "master" });

    }

    function validateInputData({ companyId }) {
        const schema = Joi.object({
            companyId: Joi.string().guid({ version: 'uuidv4' }).required(),
        });
        const { error } = schema.validate({ companyId });
        if (error) {
            console.log("error", error.details[0].message)
            throw new ValidationError(error.details[0].message);
        }
    }
}