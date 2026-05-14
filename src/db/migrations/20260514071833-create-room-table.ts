import { DataTypes, type QueryInterface } from "sequelize";

const tableName= "rooms";

export default {
  async up(queryInterface: QueryInterface) {
    await queryInterface.createTable(tableName, {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      number: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      roomTypeId: {
        type: DataTypes.INTEGER,
        references: {
          model: "roomType",
          key: "id"
        },
        allowNull: false
      },
      bookingId: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      hotelId: {
        type: DataTypes.INTEGER,
        references: {
          model: "hotels",
          key: "id"
        },
        allowNull: false
      },
      availableOn: {
        type: DataTypes.DATE,
        allowNull: false,
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
