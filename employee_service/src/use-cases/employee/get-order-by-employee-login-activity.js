module.exports = function makeGetOrderByEmployeeLoginActivity({
    getOrderByEmployeeLoginActivityDb,
    Joi,
    ValidationError
}) {
    return async function getOrderByEmployeeLoginActivity({
        orderField, id, orderType
    }) {
        console.log("getOrderByEmployeeLoginActivity", orderField, id, orderType);
        validateInputDate({ id, orderField, orderType });

        const result = await getOrderByEmployeeLoginActivityDb({ orderField, id, orderType });
        return result;
    }


    function validateInputDate({ id, orderField, orderType }) {
        const schema = Joi.object({
            id: Joi.string().guid({ version: 'uuidv4' }).required(),
            orderField: Joi.string().required(),
            orderType: Joi.string().required()
        });
        const { error } = schema.validate({ id, orderField, orderType });
        if (error) {
            console.log(error.details[0].message)
            throw new ValidationError(error.details[0].message);
        }
    }
}