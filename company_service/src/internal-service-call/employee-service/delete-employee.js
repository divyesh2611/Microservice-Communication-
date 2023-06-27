module.exports = function makeDeleteEmployee({
    axios,
    config,
    InternalServiceCallError
}) {
    return async function deleteEmployee({
        id
    }) {
        try {

            const headers = {
                companypermission: true
            };

            return await axios.delete(`${config.serviceEndPoints.employee}/v1/${id}`, { headers });
        }
        catch (e) {
            console.log(`error : ${e}`);
            throw new InternalServiceCallError(e);
        }

    }
}
