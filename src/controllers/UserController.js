const userService = require('../services/UserService');

const createNewUser = async (req, res) => {
  try {
    let data = await userService.createNewUserService(req.body);
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
};

const handleUserLogin = async (req, res) => {
  try {
    let data = await userService.handleUserLoginService(req.body);
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createNewUser,
  handleUserLogin,
};
