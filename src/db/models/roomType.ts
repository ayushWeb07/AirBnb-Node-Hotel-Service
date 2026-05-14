import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  DataTypes,
} from "sequelize";

import sequelize from "./sequelize.ts";

enum EType {
    SIGLE="single",
    DOUBLE="double",
    KING="king",
    QUEEN="queen"
}

class RoomType extends Model<
  InferAttributes<RoomType>,
  InferCreationAttributes<RoomType>
> {
  declare id: CreationOptional<number>;
  declare roomCount: number;
  declare hotelId: number;
  declare type: EType;

  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
  declare deletedAt: CreationOptional<Date | null>;
}

RoomType.init(
  {
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
  },
  {
    sequelize,
    tableName: "roomType",
    paranoid: true,
  },
);

export default RoomType;
