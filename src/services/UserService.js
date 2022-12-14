const bcrypt = require('bcryptjs');
const { createJWT } = require('../middleware/JWTAction');
const _ = require('lodash');
const db = require('../models');
const { sendSimpleEmail } = require('./EmailService');
const { generateRandomNumber } = require('../utils/genarateOTP');
const { JSON } = require('sequelize');
const salt = bcrypt.genSaltSync(10);

const createNewUserService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.email && !data.password) {
        resolve({
          errCode: 1,
          errMessage: 'Missing required parameter',
        });
      } else {
        const password = bcrypt.hashSync(data.password, salt);
        let userExist = await db.User.findOne({
          where: {
            email: data.email,
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
            roleId: 'R4',
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
      if (!data.email && !data.password) {
        resolve({
          errCode: 1,
          errMessage: 'Missing required parameter',
        });
      } else {
        let user = await db.User.findOne({
          where: {
            email: data.email,
          },
          attributes: {
            exclude: [
              'accessToken',
              'createdAt',
              'updatedAt',
              'provinceId',
              'districtId',
              'wardId',
            ],
          },
          include: [
            {
              model: db.Province,
              as: 'provinceData',
              attributes: { exclude: ['createdAt', 'updatedAt'] },
            },
            {
              model: db.District,
              as: 'districtData',
              attributes: { exclude: ['createdAt', 'updatedAt'] },
            },
            {
              model: db.Ward,
              as: 'wardData',
              attributes: { exclude: ['createdAt', 'updatedAt'] },
            },
          ],
          raw: false,
          nest: true,
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
            String(data.password),
            user.password
          );
          if (password) {
            delete user.dataValues.password;
            let accessToken = createJWT({ id: user.id }, '48h');
            // await db.User.update(
            //   {
            //     isLogin: true,
            //   },
            //   {
            //     where: {
            //       id: user.id,
            //     },
            //   }
            // );
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
        } else {
          resolve({
            errCode: 2,
            errMessage: 'User logout failed!',
          });
        }
      }
    } catch (error) {
      reject(error);
    }
  });
};
const updateUserInfoService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          errCode: 1,
          errMessage: 'Missing required parameter',
        });
      } else {
        let res = await db.User.update(
          {
            name: data.name,
            email: data.email,
            phoneNumber: data.phoneNumber,
            birthDay: data.birthDay,
            idTax: data.idTax,
            permanentAddress: data.permanentAddress,
            address: data.address,
            service: data.service,
            provinceId: data.provinceId,
            districtId: data.districtId,
            wardId: data.wardId,
          },
          {
            where: {
              id: Number(data.id),
            },
          }
        );
        if (_.isEmpty(res)) {
          resolve({
            errCode: 2,
            errMessage: 'User update failed!',
          });
        } else {
          resolve({
            errCode: 0,
            errMessage: 'User update success!',
          });
        }
      }
    } catch (error) {
      reject(error);
    }
  });
};

const getUserByIdService = (email) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!email) {
        resolve({
          errCode: 1,
          errMessage: 'Missing required parameter',
        });
      } else {
        let user = await db.User.findOne({
          where: {
            email: email,
          },
        });
        if (user) {
          resolve({
            errCode: 0,
            errMessage: 'Find user success',
            data: user,
          });
        } else {
          resolve({
            errCode: 2,
            errMessage: 'Find user success',
          });
        }
      }
    } catch (error) {
      reject(error);
    }
  });
};

const sendOTP = (email) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!email) {
        resolve({
          errCode: 1,
          errMessage: 'Missing required parameter',
        });
      } else {
        let user = await db.User.findOne({
          where: {
            email: email,
          },
        });
        if (user) {
          const OTP = generateRandomNumber();
          const date = Math.floor(Date.now() / 1000) + 7200;
          await db.MailOTP.create({
            OTP: OTP,
            userEmail: user.email,
            expiredIn: date,
          });
          await sendSimpleEmail(OTP, email);
          resolve({
            errCode: 0,
            errMessage: 'Send OTP sucess!',
            data: date,
          });
        } else {
          resolve({
            errCode: 2,
            errMessage: 'This account is not exist!',
          });
        }
      }
    } catch (error) {
      reject(error);
    }
  });
};

const loginWithOTPService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.OTP) {
        resolve({
          errCode: 1,
          errMessage: 'Missing required parameter',
        });
      } else {
        let user = await db.MailOTP.findOne({
          where: {
            OTP: data.OTP,
            userEmail: data.userEmail,
          },
          include: [
            {
              model: db.User,
              as: 'userData',
              attributes: { exclude: ['createdAt', 'updatedAt', 'password'] },
            },
          ],
          nest: true,
          raw: false,
        });
        let date = new Date();
        if (user && user.expiredIn >= date.getTime() / 1000) {
          let accessToken = createJWT({ ...user.userData.id }, '48h');
          await db.User.update(
            {
              isLogin: true,
            },
            {
              where: {
                id: user.id,
              },
            }
          );
          resolve({
            errCode: 0,
            errMessage: 'Login success!',
            userInfo: user.userData,
            accessToken: accessToken,
          });
        } else {
          resolve({
            errCode: 2,
            errMessage: 'OTP not exactly',
          });
        }
      }
    } catch (error) {
      reject(error);
    }
  });
};

const getUserByRoleIdService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.roleId || !data.page || !data.size) {
        resolve({
          errCode: 1,
          errMessage: 'Missing required parameter',
        });
      } else {
        const page = +data.page;
        const size = +data.size;
        let user = await db.User.findAndCountAll({
          where: {
            roleId: data.roleId,
          },
          limit: size,
          offset: (page - 1) * size,
          nest: true,
          raw: false,
        });
        if (user) {
          resolve({
            errCode: 0,
            errMessage: 'Find user success',
            data: user,
          });
        } else {
          resolve({
            errCode: 2,
            errMessage: 'Find user success',
          });
        }
      }
    } catch (error) {
      reject(error);
    }
  });
};

const changeRoleUserService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id || !data.roleId) {
        resolve({
          errCode: 1,
          errMessage: 'Missing required parameters!',
        });
      } else {
        let storageId = data.roleId === 'R2' ? data.storageId : null;
        let res = await db.User.update(
          {
            roleId: data.roleId,
            storageId: storageId,
          },
          {
            where: {
              id: data.id,
            },
          }
        );
        if (res) {
          resolve({
            errCode: 0,
            errMessage: 'change role success!',
          });
        } else {
          resolve({
            errCode: 2,
            errMessage: 'change role failed',
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
  updateUserInfoService,
  getUserByIdService,
  sendOTP,
  loginWithOTPService,
  getUserByIdService,
  getUserByRoleIdService,
  changeRoleUserService,
};
