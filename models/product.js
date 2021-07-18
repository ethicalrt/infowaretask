const bcrypt = require("bcrypt");
const bcrypt_p = require("bcrypt-promise");
const jwt = require("jsonwebtoken");
const { TE, to } = require("../services/util.service");
const CONFIG = require("../config/config");

module.exports = (sequelize, DataTypes) => {
  var Model = sequelize.define("product",
    {
      product_name: { type: DataTypes.STRING, allowNull: false },
      product_desc: { type: DataTypes.STRING, allowNull: false },
      product_price: { type: DataTypes.INTEGER, allowNull: false },
      status: { type: DataTypes.INTEGER, allowNull: false }, // 0 for deleted
      created_date: {
        type: DataTypes.DATE,
        defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
        allowNull: false,
      },
      created_by: { type: DataTypes.INTEGER, allowNull: true },
      modified_by: { type: DataTypes.INTEGER, allowNull: true },
      modified_date: { type: DataTypes.DATE,defaultValue: sequelize.literal("CURRENT_TIMESTAMP"), allowNull: true },
    },
    {
      timestamps: false,
    },
    {
      freezeTableName: true,
    }
  );

  Model.associate = function (models) {
    this.belongsTo(models.user, { foreignKey: "created_by", onDelete: "cascade" });
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
