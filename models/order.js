const bcrypt = require("bcrypt");
const bcrypt_p = require("bcrypt-promise");
const jwt = require("jsonwebtoken");
const { TE, to } = require("../services/util.service");
const CONFIG = require("../config/config");

module.exports = (sequelize, DataTypes) => {
  var Model = sequelize.define("order",
    {
      ordered_product_name: { type: DataTypes.STRING, allowNull: false },
      ordered_product_desc: { type: DataTypes.STRING, allowNull: false },
      ordered_product_price: { type: DataTypes.INTEGER, allowNull: false },
      ordered_product_id: { type: DataTypes.INTEGER, allowNull: false },
      status: { type: DataTypes.INTEGER, allowNull: false }, // 0 for pending, 1 for packed,2 for dispatched,3 for delivered.
      placed_date: {
        type: DataTypes.DATE,
        defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
        allowNull: false,
      },
      placed_by: { type: DataTypes.INTEGER, allowNull: true },
      modified_by: { type: DataTypes.INTEGER, allowNull: true },
      modified_date: { type: DataTypes.DATE, allowNull: true },
    },
    {
      timestamps: false,
    },
    {
      freezeTableName: true,
    }
  );

  Model.associate = function (models) {
    this.belongsTo(models.user, { foreignKey: "placed_by", onDelete: "cascade" });
    this.belongsTo(models.product, { foreignKey: "ordered_product_id", onDelete: "cascade" });
  };

  Model.prototype.getJWT = function () {
    let expiration_time = parseInt(CONFIG.development.jwt_expiration);
    return (
      "Bearer " +
      jwt.sign({ userId: this.id }, CONFIG.development.jwt_encryption, {
        expiresIn: expiration_time,
      })
    );
  };
  return Model;
};
