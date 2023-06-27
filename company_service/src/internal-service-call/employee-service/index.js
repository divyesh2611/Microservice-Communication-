const makeDeleteEmployee = require('./delete-employee');
const axios = require('axios');
const config = require('../../config');
const exceptions = require('../../exceptions');


const deleteEmployee = makeDeleteEmployee({
    axios,
    config,
    InternalServiceCallError: exceptions.InternalServiceCallError
})

const makeCreateEmployee = require('./create-employee');
const createEmployee = makeCreateEmployee({
    InternalServiceCallError: exceptions.InternalServiceCallError,
    axios,
    config
})

const makeCreateMasterRole = require('./create-master-role');
const createMasterRole = makeCreateMasterRole({
    axios,
    config,
    InternalServiceCallError: exceptions.InternalServiceCallError
})
const makeAssingMasterRole = require('./assing-master-role');
const assingMasterRole = makeAssingMasterRole({
    axios,
    config,
    InternalServiceCallError: exceptions.InternalServiceCallError
})

module.exports = {
    deleteEmployee,
    createEmployee,
    createMasterRole,
    assingMasterRole
}