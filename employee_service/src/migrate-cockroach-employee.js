const {Sequelize} = require('sequelize')

const {Umzug, SequelizeStorage} = require('umzug')

    const sequelize = new Sequelize({
    database : 'employee',
    username : 'divyesh',
    password : 'divyesh',    
    host: 'localhost',
    dialect: 'postgres',
    port:26257,
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false,
        }
    }

    });
    console.log()
        
        const umzug = new Umzug({
            migrations: { glob: "migrations/employee/*.js"},
            context: sequelize.getQueryInterface(),
            storage: new SequelizeStorage({sequelize}),
            logger: console,
        });

        (async () => await umzug.up())();
