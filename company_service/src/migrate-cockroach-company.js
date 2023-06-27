const {Sequelize} = require('sequelize')
const {Umzug, SequelizeStorage} = require('umzug');
const {config} = require('./config');

    const sequelize = new Sequelize({
        database : config.cockroach.database,
        username : config.cockroach.user,
        password : config.cockroach.password,    
        host: config.cockroach.host,
        dialect: config.cockroach.dialect,
        port:config.cockroach.port,
        dialectOptions: {
            ssl: {
                rejectUnauthorized: false,
            }
        }
        // ssl:config.cockroach.ssl
    });
        
        const umzug = new Umzug({
            migrations: { glob: "migrations/company/*.js"},
            context: sequelize.getQueryInterface(),
            storage: new SequelizeStorage({sequelize}),
            logger: console,
        });

        (async () => await umzug.up())();
 