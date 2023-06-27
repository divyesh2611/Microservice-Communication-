const config = {
    cockroach:{
        host: 'cockroachdb-0',
        user: 'root',
        password: '',
        port: 26257,
        database: 'company',
        ssl:false,
        dialect:'postgres'
    }
}
module.exports = config;