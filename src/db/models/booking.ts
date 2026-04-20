import {
    Model,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional,
    DataTypes,
} from "sequelize";

import sequelize from "./sequelize.ts";

class Booking extends Model<
    InferAttributes<Booking>,
    InferCreationAttributes<Booking>
> {
    declare id: CreationOptional<number>;
    declare status: string;
    declare idempotentKey: string;

    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;
    declare deletedAt: CreationOptional<Date | null>;
}

Booking.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },

        status: {
            type: DataTypes.ENUM("pending", "confirmed", "cancelled"),
            allowNull: false,
            defaultValue: "pending"
        },

        idempotentKey: {
            type: DataTypes.UUID,
            allowNull: false
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
        sequelize,
        tableName: "bookings",
        paranoid: true,
    },
);

export default Booking;
