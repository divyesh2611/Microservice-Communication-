module.exports = function makeLoginEmployee({
    jwt,
    insertAccessTokenDb,
    getEmployeeByEmailDb,
    uuidv4,
    Joi,
    Jwt_Secret_Key,
    ValidationError
}) {
    return async function loginEmployee({
        emailAddress, password, hostDeviceName, location, hostIp
    }) {
        console.log("loginEmployee", emailAddress, password, hostDeviceName, location, hostIp);
        validateInputDate({ emailAddress, password, hostDeviceName, location, hostIp });


        const employeeData = await getEmployeeByEmailDb({ emailAddress });
        console.log("employeeData", employeeData);
        if (employeeData) {
            if (employeeData.is_verified == 'employee is verified') {
                if (password == employeeData.password) {
                    const expirationTime = Date.now() + 3600000;
                    const authId = uuidv4();
                    const accessToken = generateAccessToken({ authId, Jwt_Secret_Key });
                    await insertAccessTokenDb({ authId, accessToken, employeeId: employeeData.id, expirationTime, hostDeviceName, location, hostIp });
                    return { accessToken, message: 'employee is login' };
                }
                else
                    return 'password is wrong';
            }
            else {
                return 'employee is not verified';
            }

        }
        else {
            return 'invalid email';
        }

    }
    function generateAccessToken({ authId, Jwt_Secret_Key }) {
        const token = jwt.sign({ authId }, Jwt_Secret_Key,);
        return token;
    }

    function validateInputDate({ emailAddress, password }) {
        const schema = Joi.object({
            emailAddress: Joi.string().email().required(),
            password: Joi.string().required()
        });
        const { error } = schema.validate({ emailAddress, password });
        if (error) {
            console.log(error.details[0].message)
            throw new ValidationError(error.details[0].message);
        }
    }
}
