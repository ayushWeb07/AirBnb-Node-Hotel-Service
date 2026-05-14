import { DataTypes, type QueryInterface } from "sequelize";

export default {
	async up(queryInterface: QueryInterface) {
		// add deletedAt column -> hotels table
		await queryInterface.addColumn("hotels", "deletedAt", {
			type: DataTypes.DATE,
			allowNull: true,
			defaultValue: null,
		});
	},

	async down(queryInterface: QueryInterface) {
		// remove deletedAt column
		await queryInterface.removeColumn("hotels", "deletedAt");
	},
};
