const useCase = require('../use-cases');



const makeCreateCompanyAction = require('./create-company');
const createCompanyAction = makeCreateCompanyAction({
    createCompany : useCase.company.createCompany,
})
const makeUpdateCompanyAction = require('./update-company');
const updateCompanyAction = makeUpdateCompanyAction({
    updateCompany:useCase.company.updateCompany,
})
const makeDeleteCompanyAction = require('./delete-company');
const deleteCompanyAction = makeDeleteCompanyAction({
    deleteCompany:useCase.company.deleteCompany,
})
const makeGetCompanyByIdAction = require('./get-company-by-id');
const getCompanyByIdAction = makeGetCompanyByIdAction({
    getCompanyById:useCase.company.getCompanyById,
})

const makeGetAllCompanyAction = require('./get-all-company');
const getAllCompanyAction = makeGetAllCompanyAction({
    getAllCompany:useCase.company.getAllCompany,
})
const makeGetCompanyIdByNameAction = require('./get-company-id-by-name');
const getCompanyIdByNameAction = makeGetCompanyIdByNameAction({
    getCompanyIdByName:useCase.company.getCompanyIdByName,
})

module.exports = Object.freeze({
    getCompanyByIdAction,
    getAllCompanyAction,
    createCompanyAction,
    updateCompanyAction,
    deleteCompanyAction,
    getCompanyIdByNameAction
})