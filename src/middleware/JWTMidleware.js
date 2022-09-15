const { getUserByIdService } = require("../services/UserService");
const { verifyToken } = require("./JWTAction");

const authhorizationMidleware = async (req, res, next) => {
  const token = req.headers.cookie
    ? req.headers.cookie.split("refreshToken=")[1]
    : null;
  if (!token) res.status(401);
  let user = verifyToken(token, process.env.JWT_ACCESS_TOKEN);
  if (!user) {
    res.status(200).json({
      errCode: -2,
      errMessage:
        "You need to login again because the authhorization token is expires",
    });
  } else {
    if (user) {
      let result = await getUserByIdService(user.id);
      if (result.data.refreshToken === token) {
        next();
      } else {
        res.status(200).json({
          errCode: -3,
          errMessage: "This is not your refresh token ",
        });
      }
    } else {
      res.status(200).json({
        errCode: -4,
        errMessage: "err form authenticate",
      });
    }
  }
};

const accessMidleware = (req, res, next) => {
  const auth = req.headers.authorization;
  const token = auth.split("Bearer ")[1];
  if (!token) res.status(200).json({
    errCode:404,
    errMessage:'token is invalid'
  });
  let user = verifyToken(token, process.env.JWT_ACCESS_TOKEN);
  if (!user) {
    res.status(200).json({
      errCode: -2,
      errMessage:
        "You need to login again because the authhorization token is expires",
    });
  } else {
    if (user.roleId === "R1" || user.roleId === "R2") {
      next();
    } else {
      res.status(200).json({
        errCode: -2,
        errMessage: "You do no have a role to access page",
      });
    }
  }
};

const adminMidleware = (req, res, next) => {
  const token = req.headers.cookie
    ? req.headers.cookie.split("refreshToken=")[1]
    : null;
  if (!token) res.status(401);
  let user = verifyToken(token, process.env.JWT_ACCESS_TOKEN);
  if (!user) {
    res.status(200).json({
      errCode: -2,
      errMessage:
        "You need to login again because the authhorization token is expires",
    });
  } else {
    if (user.roleId === "R1") {
      next();
    } else {
      res.status(200).json({
        errCode: -2,
        errMessage: "You do no have a role to access page",
      });
    }
  }
};

module.exports = {
  authhorizationMidleware,
  accessMidleware,
  adminMidleware,
};
