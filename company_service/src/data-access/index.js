 const makeCompanyDbMethods =  require('./comany.db');
 const {config} = require('../config');
 const {Pool} = require('pg');
 const exceptions = require('../exceptions');
 const pool = new Pool({
    host: config.cockroach.host,
    user:  config.cockroach.user,
    password:  config.cockroach.password,
    port:  config.cockroach.port,
    database:  config.cockroach.database,
    ssl : {
        rejectUnauthorized:false
    },
    // isSSL:config.cockroach.ssl
})


pool.connect()
    .then(() => console.log(`cockroachDb connected on port ${config.cockroach.port}`))
    .catch((e) => console.error(`Error while connecting cockroachDb!:${e}`))

 const companyDbMethods = makeCompanyDbMethods({
    pool,
    database:config.cockroach.database,
    DatabaseError:exceptions.DatabaseError
 })


const dbMethods = {
    companyDbMethods
}
module.exports = dbMethods