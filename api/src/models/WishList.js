const { DataTypes } = require('sequelize');
// Modelo de categoria
module.exports = (sequelize) => {
    sequelize.define('wishlist', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
       
    },
        { timestamps: false })
};