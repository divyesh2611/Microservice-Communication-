module.exports = function makeLoginEmployeeAction({
    loginEmployee,
    getEmployeeLocation
}) {
    return async function loginEmployeeAction(req, res) {
        try {
            const password = req.body.password;
            const emailAddress = req.body.emailAddress;
            const hostDeviceName = req.headers.hostdevicename;
            const hostIp = req.headers.ipaddress;
            const location = await getEmployeeLocation({ hostIp });


            console.log(emailAddress, password, hostDeviceName, location, hostIp);
            const { accessToken } = await loginEmployee({ emailAddress, password, hostDeviceName, location, hostIp });
            res.setHeader('Authorization', accessToken);
            console.log(accessToken)
            res.end(accessToken);
        }
        catch (e) {
            console.log(`error:${e}`);
            res.status(404).send(e);
        }
    }
}



//var jsonData = JSON.parse(responseBody);
// postman.setEnvironmentVariable("bearer_token",jsonData.data.access_token);