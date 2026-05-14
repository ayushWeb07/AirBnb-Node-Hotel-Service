import { DataTypes, type QueryInterface } from "sequelize";

export default {
	async up(queryInterface: QueryInterface) {
		// add name column -> hotels table
		await queryInterface.addColumn("hotels", "name", {
			type: DataTypes.STRING(20),
			allowNull: false,
		});

		// add address column -> hotels table
		await queryInterface.addColumn("hotels", "address", {
			type: DataTypes.TEXT,
			allowNull: false,
		});
	},

	async down(queryInterface: QueryInterface) {
		// remove name column
		await queryInterface.removeColumn("hotels", "name");

		// remove address column
		await queryInterface.removeColumn("hotels", "address");
	},
};
