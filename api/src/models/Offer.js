const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
    sequelize.define(
        "offer",
        {
            discount: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            day: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        },
        { timestamps: false }
    );
};
