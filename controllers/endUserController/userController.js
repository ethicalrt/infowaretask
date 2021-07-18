const authService = require('../../services/auth.service');
const { to, TE, ReE, ReS } = require('../../services/util.service');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const models = require('../../models');
const UserModel = models.user;


const Login = async function (req, res) {
    if (req.body.email == '' || req.body.password == '') {
        return ReE(res = "Not all mandatory params are passed.");
    }
    const body = req.body;

    let err, user;
    [err, user] = await to(UserModel.findOne({
        where: {
            email: body.email,
            status: 0,
        }
    }));
    if (err) return ReE(res, err);
    if (user != null) {
        [err, user] = await to(authService.authUser(req.body));
        if (err) return ReE(res, err);
        return ReS(res, { token: user.getJWT(), message: 'Logged in successfully.', user: user });
    } else {
        return ReE(res, err = "User not found");
    }
}
module.exports.Login = Login;


const createAccount = async function (req, res) {
  if (req.body.name == '' || req.body.mobile == '' || req.body.email == '' || req.body.password == ''
      || req.body.userType == '') {
      return ReE(res, { message: 'Not all mandatory params are passed' });
  }

  if (req.body.user_id == undefined) {
         let err;
      
         let userData;
         let user = {};
         user.name = req.body.name;
         user.mobile = req.body.mobile;
         user.email = req.body.email;
         user.user_type ='U';
         user.password = req.body.password;
         user.gender = req.body.gender;
         user.email_verified = 1;
         user.status = 0 ;// 0 for active, 1 for inactive, 2 for delete  
         [err, userData] = await to(UserModel.create(user));
         
         return ReS(res, { message: 'User Details successfully Added.', data: userData });
        }else{
            
        let err;
        let user = {};
        user.name = req.body.name;
        user.mobile = req.body.mobile;
        user.email = req.body.email;
        user.user_type = 'A';
        user.password = req.body.password;
        user.gender = req.body.gender;
        user.email_verified = 1;
        user.status = 0; // 0 for active, 1 for inactive, 2 for delete 
        let userData;
        [err, userData] = await to(UserModel.update(user,
          {
              where:
                  {id: req.body.user_id}
          }));
       
     return ReS(res, { message: 'User Details successfully Updated.', data: userData });
      }
}
module.exports.createAccount = createAccount;

