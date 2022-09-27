const { verifyToken } = require('./JWTAction');

const accessMidleware = async (req, res, next) => {
  const auth = req.headers.authorization;
  const token = auth ? auth.split('Bearer ')[1] : '';
  if (!token)
    res.status(200).json({
      errCode: 404,
      errMessage: 'token is invalid',
    });
  let user = verifyToken(token, process.env.JWT_ACCESS_TOKEN);
  if (user && user.id) {
    next();
  } else {
    res.status(200).json({
      errCode: 404,
      errMessage: 'token is invalid',
    });
  }
};

const adminMidleware = (req, res, next) => {
  const token = req.headers.cookie
    ? req.headers.cookie.split('refreshToken=')[1]
    : null;
  if (!token) res.status(401);
  let user = verifyToken(token, process.env.JWT_ACCESS_TOKEN);
  if (!user) {
    res.status(200).json({
      errCode: -2,
      errMessage:
        'You need to login again because the authhorization token is expires',
    });
  } else {
    if (user.roleId === 'R1') {
      next();
    } else {
      res.status(200).json({
        errCode: -2,
        errMessage: 'You do no have a role to access page',
      });
    }
  }
};

module.exports = {
  accessMidleware,
  adminMidleware,
};
