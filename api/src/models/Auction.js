const { DataTypes } = require('sequelize');
// Modelo de categoria
module.exports = (sequelize) => {
    sequelize.define('auction', {
        id_auction: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        state: {
            type: DataTypes.ENUM(['subastado', 'subastando', 'pendiente']),
            allowNull: false,
        },
        percentage: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        time: {
            type: DataTypes.STRING,
        },
        date: {
            type: DataTypes.STRING,
        },
    },
    )
};