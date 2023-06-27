const Sequelize = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up({ context: queryInterface }) {
        await queryInterface.createTable("role", {
            role_id: {
                type: Sequelize.DataTypes.UUID,
                defaultValue: Sequelize.literal("gen_random_uuid()"),
                allowNull: false,
                primaryKey: true
            },
            role_name: {
                type: Sequelize.DataTypes.STRING,
                allowNull: false
            },
            permission: {
                type: Sequelize.DataTypes.JSONB,
                allowNull: false
            },
            company_id: {
                type: Sequelize.DataTypes.STRING,
                allowNull: false
            },
            is_master: {
                type: Sequelize.DataTypes.BOOLEAN,
                allowNull: false
            }

        });

    },

    async down(queryInterface, Sequelize) {
        /**
         * Add reverting commands here.
         *
         * Example:
         * await queryInterface.dropTable('users');
         */
    },
};


