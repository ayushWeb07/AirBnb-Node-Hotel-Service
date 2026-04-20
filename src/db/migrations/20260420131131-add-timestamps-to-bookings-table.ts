import { DataTypes, type QueryInterface } from "sequelize";

export default {
  async up (queryInterface: QueryInterface) {

    // add createdAt column -> bookings table
    await queryInterface.addColumn("bookings", "createdAt", {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    })

    // add updatedAt column -> bookings table
    await queryInterface.addColumn("bookings", "updatedAt", {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    })

    // add deletedAt column -> bookings table
    await queryInterface.addColumn("bookings", "deletedAt", {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null
    })

  },

  async down (queryInterface: QueryInterface) {
    // remove createdAt column
    await queryInterface.removeColumn("bookings", "createdAt")

    // remove updatedAt column
    await queryInterface.removeColumn("bookings", "updatedAt")

    // remove deletedAt column
    await queryInterface.removeColumn("bookings", "deletedAt")
  }
};
