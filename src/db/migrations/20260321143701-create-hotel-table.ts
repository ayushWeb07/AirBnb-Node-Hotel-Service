import { DataTypes, type QueryInterface } from "sequelize";

export default {
	async up(queryInterface: QueryInterface) {
		await queryInterface.createTable("hotels", {
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				allowNull: false,
			},
		});
	},

	async down(queryInterface: QueryInterface) {
		await queryInterface.dropTable("hotels");
	},
};
