const bcrypt = require("bcrypt");
const bcrypt_p = require("bcrypt-promise");
const jwt = require("jsonwebtoken");
const { TE, to } = require("../services/util.service");
const CONFIG = require("../config/config");

module.exports = (sequelize, DataTypes) => {
  var Model = sequelize.define(
    "user",
    {
      name: { type: DataTypes.STRING, allowNull: false },
      mobile: { type: DataTypes.STRING, allowNull: false },
      email: { type: DataTypes.STRING, allowNull: true },
      password: { type: DataTypes.STRING, allowNull: false },
      user_type: { type: DataTypes.ENUM, values: ["U", "A"] },
      email_verified: { type: DataTypes.INTEGER, allowNull: true },
      status: { type: DataTypes.INTEGER, allowNull: false },
      gender: { type: DataTypes.STRING, allowNull: false },
      registered_date: {
        type: DataTypes.DATE,
        defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
        allowNull: false,
      },
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

  Model.beforeSave(async (user, options) => {
    let err;
    if (user.changed("password")) {
      let salt, hash;
      [err, salt] = await to(bcrypt.genSalt(10));
      if (err) TE(err.message, true);
      [err, hash] = await to(bcrypt.hash(user.password, salt));
      if (err) TE(err.message, true);

      user.password = hash;
    }
  });

  Model.prototype.comparePassword = async function (pw) {
    let err, pass;
    if (!this.password) TE("password not set");
    [err, pass] = await to(bcrypt_p.compare(pw, this.password));
    if (err) TE(err);
    if (!pass) TE("Invalid password");
    return this;
  };

  Model.prototype.getJWT = function () {
    let expiration_time = parseInt(CONFIG.development.jwt_expiration);
    return (
      "Bearer " +
      jwt.sign({ user_id: this.id }, CONFIG.development.jwt_encryption, {
        expiresIn: expiration_time,
      })
    );
  };

  Model.prototype.toWeb = function (pw) {
    let json = this.toJSON();
    return json;
  };

  return Model;
};
