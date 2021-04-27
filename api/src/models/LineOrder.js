const { DataTypes } = require("sequelize");
// Modelo de categoria
module.exports = (sequelize) => {
    sequelize.define(
        "lineorder",
        {
            id_line: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            unit_price: {
                type: DataTypes.FLOAT,
                allowNull: false,
            },
            quantity: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        },
        { timestamps: false }
    );
};
