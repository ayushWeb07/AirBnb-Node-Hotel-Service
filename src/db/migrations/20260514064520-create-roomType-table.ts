import { DataTypes, type QueryInterface } from "sequelize";

const tableName= "roomType";

export default {
  async up(queryInterface: QueryInterface) {
    await queryInterface.createTable(tableName, {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      roomCount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      type: {
        type: DataTypes.ENUM("single", "double", "king", "queen"),
        defaultValue: "single",
        allowNull: false
      },
      hotelId: {
        type: DataTypes.INTEGER,
        references: {
          model: "hotels",
          key: "id"
        },
        allowNull: false
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
      },
      deletedAt: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null
      },
    });
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.dropTable(tableName)
  },
};
