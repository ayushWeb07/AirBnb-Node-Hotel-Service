import { DataTypes, type QueryInterface } from "sequelize";

export default {
	async up(queryInterface: QueryInterface) {
		// remove number column -> rooms table
		await queryInterface.removeColumn("rooms", "number");
	},

	async down(queryInterface: QueryInterface) {
		// add the number column back
		await queryInterface.addColumn("rooms", "number", {
			type: DataTypes.INTEGER,
			allowNull: false,
			defaultValue: 0,
		});
	},
};
