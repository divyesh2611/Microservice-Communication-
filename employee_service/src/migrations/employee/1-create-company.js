const Sequelize = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up({ context: queryInterface }) {
    await queryInterface.createTable("employee", {
      id: {
        type: Sequelize.DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.literal("gen_random_uuid()")
      },
      name: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      contact_no: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: true
      },
      address: {
        type: Sequelize.DataTypes.STRING,
        allowNull: true
      },
      designation: {
        type: Sequelize.DataTypes.STRING,
        allowNull: true
      },
      company_id: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
      },
      emailaddress: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
      },
      password: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
      },
      is_verified: {
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