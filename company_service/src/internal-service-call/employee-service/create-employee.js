module.exports = function makeCreateEmployee({ axios, config, InternalServiceCallError }) {
    return async function createEmployee({ owner }) {
        try {

            const requestBody = {
                "name": owner.name,
                "emailAddress": owner.emailAddress,
                "address": owner.address,
                "designation": owner.designation,
                "password": owner.password,
                "isvarified": owner.isvarified,
                "contactno": owner.contactno
            };
            const headers = {
                companypermission: true
            };

            return await axios.post(`${config.serviceEndPoints.employee}`, requestBody, { headers });
        } catch (e) {
            console.log(`error: ${e}`);
            throw new InternalServiceCallError(e);
        }
    };
};
