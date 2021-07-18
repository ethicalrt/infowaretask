const validator = require('validator');
const { to, TE, ReE, ReS } = require('../services/util.service');
const models = require('../models');
const User = models.user;
const CONFIG = require('../config/config');
const Seq = require("sequelize");
const Op = Seq.Op;
const getUniqueKeyFromBody = function (body) {// this is so they can send in 3 options unique_key, email, or mobile and it will work
    let unique_key = body.unique_key;
    if (typeof unique_key === 'undefined') {
        if (typeof body.email != 'undefined') {
            unique_key = body.email
        } else if (typeof body.mobile != 'undefined') {
            unique_key = body.mobile
        } else {
            unique_key = null;
        }
    }

    return unique_key;
}
module.exports.getUniqueKeyFromBody = getUniqueKeyFromBody;
const authUser = async function (userInfo) {//returns token
    let unique_key;
    let auth_info = {};
    auth_info.status = 'login';
    unique_key = getUniqueKeyFromBody(userInfo);

    if (!unique_key) TE('Please enter an Email to login');
    if (!userInfo.password) TE('Please enter a password to login');
    let user;
    if (validator.isEmail(unique_key)) {//checks if only phone number was sent
        auth_info.method = 'email';

        [err, user] = await to(User.findOne({ where: { email: unique_key } }));
        if (err) TE(err.message);
    } else {
        TE('Please enter valid Email');
    }
    if (!user) TE('User not registered');
    [err, user] = await to(user.comparePassword(userInfo.password));

    if (err) TE(err.message);

    return user;

}
module.exports.authUser = authUser;
