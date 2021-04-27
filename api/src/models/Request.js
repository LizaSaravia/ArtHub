const { DataTypes } = require("sequelize");
// Modelo de categoria
module.exports = (sequelize) => {
    sequelize.define(
        "request",
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            cv: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            links: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            fundament: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            state: {
                type: DataTypes.ENUM(['pending', 'approved', 'declined']),
                allowNull: false,
            },
        },
        { timestamps: false }
    );
};
