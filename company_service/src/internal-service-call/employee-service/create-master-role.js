module.exports = function makeCreateMasterRole({
    axios,
    config,
    InternalServiceCallError
}) {
    return async function createMasterRole({
        companyId
    }) {
        try {
            const headers = {
                companypermission: true
            };
            const requestBody = {
                companyId
            }
            return await axios.post(`${config.serviceEndPoints.employee}/role/master`, requestBody, { headers });
        } catch (e) {
            console.log(`error: ${e}`);
            throw new InternalServiceCallError(e);
        }

    }
}