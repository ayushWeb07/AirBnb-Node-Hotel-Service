import { DataTypes, type QueryInterface } from "sequelize";

export default {
  async up (queryInterface: QueryInterface) {

    // add createdAt column -> hotels table
    await queryInterface.addColumn("hotels", "createdAt", {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    })

    // add updatedAt column -> hotels table
    await queryInterface.addColumn("hotels", "updatedAt", {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    })

  },

  async down (queryInterface: QueryInterface) {
    // remove createdAt column
    await queryInterface.removeColumn("hotels", "createdAt")

    // remove updatedAt column
    await queryInterface.removeColumn("hotels", "updatedAt")
  }
};
