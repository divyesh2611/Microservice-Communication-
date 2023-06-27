

module.exports = function makeEmployeeVerificationByEmail({
    updateEmployeeVerificationDb,
    jwt,
    Jwt_Secret_Key,
    ValidationError
}) {
    return async function employeeVerificationByEmail({
        verificationToken
    }) {
        console.log("employeeVerificationByEmailUsecase", verificationToken)
        if (!verificationToken) {
            throw new ValidationError('"verificationToken" is required');
        }
        let id;
        console.log("jwt token", Jwt_Secret_Key);
        await jwt.verify(verificationToken, Jwt_Secret_Key, (err, decoded) => {
            if (err) {
                console.log(err);
                throw new Error('"verificationToken" is invalid')
            }
            console.log("decode", decoded);
            id = decoded;
        });

        console.log("id********************", id);
        await updateEmployeeVerificationDb({ isVerified: true, id });
        return 'employee is verified';
    }


}