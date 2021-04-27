const { DataTypes } = require("sequelize");
// Modelo de product (Matias)
module.exports = (sequelize) => {
	sequelize.define(
		"product",
		{
			id_product: {
				type: DataTypes.INTEGER,
				autoIncrement: true,
				primaryKey: true,
			},
			title: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			price: {
				type: DataTypes.FLOAT,
				allowNull: false,
			},
			description: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			stock: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
		},
		
	);
};
