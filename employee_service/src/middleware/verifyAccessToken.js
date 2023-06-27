
module.exports = function makeVerifyAccessToken({
    jwt,
    getDataByEmployeeId,
    updateExpirationTime,
    Jwt_Sceret_Key
}) {
    return async function verifyAccessToken(req, res, next) {

        console.log("verifyAccessToken", req.headers.companypermission)
        if (req.headers.companypermission) {
            next();
        }
        else {
            let accessTokenWithBearer = req.headers.authorization;
            let accessToken = accessTokenWithBearer.replace('Bearer ', '');
            console.log("accesstoken", accessToken);
            if (!accessToken) res.send("You are not authenticated!");

            await jwt.verify(accessToken, Jwt_Sceret_Key, async (err, user) => {
                console.log("user", user);
                const authId = user.authId;
                if (err) res.send("did not match accessToken");
                const data = await getDataByEmployeeId({ authId });

                if (data.expiretion_time > Date.now()) {
                    const expirationTime = Date.now() + 3600000;
                    await updateExpirationTime({ expirationTime, employeeId: data.employee_id, });
                }
                req.id = data.employee_id;
            });

            next();

        }
    }
}