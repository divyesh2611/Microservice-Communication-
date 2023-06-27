module.exports = function makeAssingMasterRole({
    axios,
    config,
    InternalServiceCallError
}) {
    return async function assingMasterRole({
        roleId, masterId
    }) {
        try {
            const headers = {
                companypermission: true
            };
            const requestBody = {
                roleId,
                employeeId: masterId
            }
            return await axios.post(`${config.serviceEndPoints.employee}/role/assing`, requestBody, { headers });
        } catch (e) {
            console.log(`error: ${e}`);
            throw new InternalServiceCallError(e);
        }

    }
}