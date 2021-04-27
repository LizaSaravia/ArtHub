const jwt = require('jsonwebtoken')
function verifyTokenResetPw(req, res, next) {
  const token = req.body.headers["Authorization"];

  if (!token) {

    return res.status(401).json({
      auth: false,
      message: "No token provided",
    });
  } else {
    console.log(token)

    try {
      var decoded = jwt.verify(token, "secret_change_key");
      req.userId = decoded.id
      next();
    } catch (err) {
      res.json({ auth: false })
    }

  }

}

module.exports = verifyTokenResetPw;
