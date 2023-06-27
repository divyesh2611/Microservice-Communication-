const makeGetCompanyIdByName = require('./get-company-id-by-name');
const config = require('../../config');
const exceptions = require('../../exceptions')
console.log("config", config.serviceEndPoints.company);
const axios = require('axios');
const getCompanyIdByName = makeGetCompanyIdByName({
    axios,
    config,
    InternalServiceCallError: exceptions.InternalServiceCallError
})
module.exports = {
    getCompanyIdByName
}