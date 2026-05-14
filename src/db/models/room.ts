import {
	Model,
	InferAttributes,
	InferCreationAttributes,
	CreationOptional,
	DataTypes,
} from "sequelize";

import sequelize from "./sequelize.ts";

class Room extends Model<InferAttributes<Room>, InferCreationAttributes<Room>> {
	declare id: CreationOptional<number>;
	declare number: number;
	declare price: number;
	declare roomTypeId: number;
	declare bookingId: number | null;
	declare hotelId: number;

	declare availableOn: Date;
	declare createdAt: CreationOptional<Date>;
	declare updatedAt: CreationOptional<Date>;
	declare deletedAt: CreationOptional<Date | null>;
}

Room.init(
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			allowNull: false,
		},
		number: {
			type: DataTypes.INTEGER,
			allowNull: false,
			defaultValue: 0,
		},
		price: {
			type: DataTypes.INTEGER,
			allowNull: false,
			defaultValue: 0,
		},
		roomTypeId: {
			type: DataTypes.INTEGER,
			references: {
				model: "roomType",
				key: "id",
			},
			allowNull: false,
		},
		bookingId: {
			type: DataTypes.INTEGER,
			allowNull: true,
		},
		hotelId: {
			type: DataTypes.INTEGER,
			references: {
				model: "hotels",
				key: "id",
			},
			allowNull: false,
		},
		availableOn: {
			type: DataTypes.DATE,
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
		sequelize,
		tableName: "rooms",
		paranoid: true,
	},
);

export default Room;
