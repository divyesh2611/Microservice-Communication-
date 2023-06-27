module.exports = function makeGetCompanyIdByName({
    axios,
    config,
    InternalServiceCallError
}) {
    return async function getCompanyIdByName({ companyName }) {

        try {
            console.log("getCompanyIdByNameApiii", companyName);
            const { data } = await axios.get(`${config.serviceEndPoints.company}/v1/${companyName}`)
            console.log("axiosdata", data)
            return data;
        }
        catch (e) {
            console.log(`error:${e}`);
            throw new InternalServiceCallError(e);
        }

    }
}