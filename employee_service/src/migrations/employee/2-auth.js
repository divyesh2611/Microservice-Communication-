const Sequelize = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up({ context: queryInterface }) {
    await queryInterface.createTable("auth", {
      auth_id:{
        type: Sequelize.DataTypes.UUID,
        allowNull:true,
        primaryKey:true,
      },
      employee_id: {
        type: Sequelize.DataTypes.UUID,
        allowNull: false,
        references: {
            model: "employee",
            key: "id",
          },
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
      },
      host_device: {
        type:Sequelize.DataTypes.STRING,
        allowNull:false
      },
      access_token: {
        type:Sequelize.DataTypes.STRING,
        allowNull:false
      },
      expiration_time:{
        type:Sequelize.DataTypes.STRING,
        allowNull:false
      },
      host_ip:{
        type:Sequelize.DataTypes.STRING,
        allowNull:false
      },
      location:{
        type:Sequelize.DataTypes.STRING,
        allowNull:false
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