const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
    sequelize.define(
        "shoppingcart",
        {
            id_order: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            state: {
                type: DataTypes.ENUM(['pending', 'fullfilled', 'cancelled']),
                allowNull: false,
            },
            total_price: {
                type: DataTypes.FLOAT,
                allowNull: false,
            },
            payment_id: {
                type: DataTypes.INTEGER,
                defaultValue: 0
            },
            payment_status: {
                type: DataTypes.STRING,
                defaultValue: ""
            },
            payment_method: {
                type: DataTypes.STRING,
            },
            merchant_order_id: {
                type: DataTypes.BIGINT,
                defaultValue: 0
            },
            payment_link: {
                type: DataTypes.STRING,
                validate: {
                    isUrl: true
                }
            },
            address:{
                type: DataTypes.STRING
            }
        },

    );
};