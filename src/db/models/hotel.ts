import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  DataTypes,
} from "sequelize";

import sequelize from "./sequelize";

class Hotel extends Model<
  InferAttributes<Hotel>,
  InferCreationAttributes<Hotel>
> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare address: string;

  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
  declare deletedAt: CreationOptional<Date | null>;
}

Hotel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },

    name: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },

    address: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },

    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },

    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
    },
  },
  {
    hooks: {

      beforeCreate: (hotel, options) => {
        hotel.name= hotel.name.toLowerCase()
      },

      afterCreate: (hotel, options) => {
        console.log(`New hotel created with index: ${hotel.id}`)
      },

      beforeUpdate: (hotel, options) => {
        hotel.name= hotel.name.toLowerCase()
      },

      afterUpdate: (hotel, options) => {
        console.log(`Existing hotel updated with index: ${hotel.id}`)
      },

      afterDestroy: (hotel, options) => {
        console.log(`Existing hotel deleted with index: ${hotel.id}`)
      },

    },
    sequelize,
    tableName: "hotels",
    paranoid: true,
  },
);

export default Hotel;
