const { DataTypes } = require("sequelize");
// Modelo de categoria
module.exports = (sequelize) => {
    sequelize.define(
        "review",
        {
            id_review: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            description: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            qualification: {
                type: DataTypes.FLOAT,
                allowNull: false,
            },
        },
    );
};