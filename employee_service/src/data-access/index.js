const makeEmployeeDbMethods = require('./employee.db');
const makeAuthDbMethod = require('./auth.db');
const makeEmployeeRoleAssociationDbMethod = require('./emaloyeeroleassociation.db');
const makeRoleDbMethod = require('./role.db');
const { config } = require('../config');
const { Pool } = require('pg');
const exceptions = require('../exceptions')
const pool = new Pool({
    host: config.config,
    user: config.cockroach.user,
    password: config.cockroach.password,
    port: config.cockroach.port,
    database: config.cockroach.database,
    ssl: {
        rejectUnauthorized: false
    }
    // isSSL:config.cockroach
})

pool.connect()
    .then(() => console.log(`cockroachDb connected on port ${config.cockroach.port}`))
    .catch((e) => console.error(`Error while connecting cockroachDb!:${e}`))

const employeeDbMethods = makeEmployeeDbMethods({
    pool,
    database: config.cockroach.database,
    DatabaseError: exceptions.DatabaseError
})
const authDbMethod = makeAuthDbMethod({
    pool,
    database: config.cockroach.database,
    DatabaseError: exceptions.DatabaseError
})
const employeeRoleAssociationDbMethod = makeEmployeeRoleAssociationDbMethod({
    pool,
    Database: config.cockroach.database,
    DatabaseError: exceptions.DatabaseError
})
const roleDbMethode = makeRoleDbMethod({
    pool,
    Database: config.cockroach.database,
    DatabaseError: exceptions.DatabaseError
})

const dbMethods = {
    employeeDbMethods,
    authDbMethod,
    employeeRoleAssociationDbMethod,
    roleDbMethode
}
module.exports = dbMethods