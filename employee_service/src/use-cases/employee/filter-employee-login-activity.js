
module.exports = function makeFilterEmployeeLoginActivity({
    getEmployeeLoginActivityDb,
    Joi
}) {
    return async function makeFilterEmployeeLoginActivity({
        ip, location, device, employeeId
    }) {
        console.log("makeFilterEmployeeLoginActivity", ip, location, device, employeeId);
        validateInputData({ ip, location, device, employeeId });
        const result = await getEmployeeLoginActivityDb({ employeeId });
        if (location || device || employeeId) {
            return filter(result, location, device, ip);
        }
        return result;
    }

    function filter(result, location, device, ip) {
        let temp = [];
        for (let i = 0; i < result.length; i++) {
            if (result[i].host_ip.includes(ip) && result[i].host_device.includes(device) && result[i].location.includes(location)) {
                temp.push(result[i]);
            }
        }
        console.log("temp", temp);
        return temp;
    }

    function validateInputData({ ip, location, device, employeeId }) {
        const schema = Joi.object({
            ip: Joi.string().required(),
            location: Joi.string().required(),
            device: Joi.string().required(),
            employeeId: Joi.string().required()
        });
        const { error } = schema.validate({ ip, location, device, employeeId });
        if (error) {
            console.log("error", error.details[0].message)
            throw new ValidationError(error.details[0].message);
        }
    }
}