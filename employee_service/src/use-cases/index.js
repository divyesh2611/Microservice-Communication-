const employee = require('./employee');
const kafka = require('./kafka');
const emails = require('./emails');
const file = require('./file');
const role = require('./role');
const employeeRoleAssociation = require('./employee-role-asso');
module.exports = Object.freeze({
    employee,
    kafka,
    emails,
    file,
    role,
    employeeRoleAssociation
})