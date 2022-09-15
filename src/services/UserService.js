const bcrypt = require('bcryptjs');
const { createJWT } = require('../middleware/JWTAction');
const _ = require('lodash');
const db = require('../models');
const salt = bcrypt.genSaltSync(10);

const createNewUserService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.phoneNumber && !data.password) {
        resolve({
          errCode: 1,
          errMessage: 'Missing required parameter',
        });
      } else {
        const password = bcrypt.hashSync(data.password, salt);
        let userExist = await db.User.findOne({
          where: {
            phoneNumber: data.phoneNumber,
          },
        });
        if (userExist) {
          resolve({
            errCode: 2,
            errMessage: 'This account is exist in system!',
          });
        } else {
          await db.User.create({
            name: data.name,
            email: data.email,
            phoneNumber: data.phoneNumber,
            password: password,
            birthDay: data.birthDay,
            idTax: data.idTax,
            permanentAddress: data.permanentAddress,
            address: data.address,
            service: data.service,
          });
          resolve({
            errCode: 0,
            errMessage: 'Create user success!',
          });
        }
      }
    } catch (error) {
      reject(error);
    }
  });
};

const handleUserLoginService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.phoneNumber && !data.password) {
        resolve({
          errCode: 1,
          errMessage: 'Missing required parameter',
        });
      } else {
        let user = await db.User.findOne({
          where: {
            phoneNumber: data.phoneNumber,
          },
          attributes: {
            exclude: ['accessToken', 'createdAt', 'updatedAt'],
          },
        });
        if (!user) {
          resolve({
            errCode: 2,
            errMessage: 'This account is not exist in system!',
          });
        } else if (user.isLogin) {
          resolve({
            errCode: 2,
            errMessage: 'This account is logging!',
          });
        } else {
          const password = await bcrypt.compareSync(
            data.password,
            user.password
          );
          if (password) {
            delete user.password;
            let accessToken = createJWT(user, '48h');
            await db.User.update(
              {
                isLogin: true,
                accessToken: accessToken,
              },
              {
                where: {
                  id: user.id,
                },
              }
            );
            resolve({
              errCode: 0,
              errMessage: 'User login success!',
              userInfo: user,
              accessToken: accessToken,
            });
          } else {
            resolve({
              errCode: 3,
              errMessage: 'Wrong password!',
            });
          }
        }
      }
    } catch (error) {
      reject(error);
    }
  });
};

const handleUserLogoutService = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!id) {
        resolve({
          errCode: 1,
          errMessage: 'Missing required parameter',
        });
      } else {
        let res = await db.User.update(
          {
            isLogin: false,
            accessToken: null,
          },
          {
            where: {
              id: id,
            },
          }
        );
        if (!_.isEmpty(res)) {
          resolve({
            errCode: 0,
            errMessage: 'User logout success!',
          });
        }
      }
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  createNewUserService,
  handleUserLoginService,
  handleUserLogoutService,
};
