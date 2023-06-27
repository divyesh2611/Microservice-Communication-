const Sequelize = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up({ context: queryInterface }) {
        await queryInterface.createTable("employee_role_association", {
            role_id: {
                type: Sequelize.DataTypes.UUID,
                allowNull: false,
                primaryKey: true,
                references: {
                    model: "role",
                    key: "role_id",
                },
                onUpdate: "CASCADE",
                onDelete: "CASCADE",
            },
            employee_id: {
                type: Sequelize.DataTypes.UUID,
                allowNull: false,
                primaryKey: true,
                references: {
                    model: "employee",
                    key: "id",
                },
                onUpdate: "CASCADE",
                onDelete: "CASCADE",
            },


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