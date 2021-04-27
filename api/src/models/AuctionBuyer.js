const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
    sequelize.define('auctionb', {
        id_auctionbuyer: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        finalPrice: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        buyer_id:{
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        auction_id:{
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    },
    )
};