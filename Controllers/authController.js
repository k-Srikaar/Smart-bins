const User = require("./../Model/user");
const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const GSM = require("./../Model/gsm");
// const { decode } = require("punycode");

exports.protect = async (req, res, next) => {
  let token;
  // 1.Getting token and check of it's there
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }
  if (!token) {
    return res.status(404).json("Invalid Token !!");
  }
  //   console.log(token);
  // 2.Verification of token
  const decoded = await promisify(jwt.verify)(token, "secret_key");
  // console.log(decoded);
  // 3.Check if user still exists on the token
  const currentuser = await User.findById(decoded.userId);
  // console.log(re);
  if (!currentuser) {
    return res.status(404).json("User Does Not Exists!!");
  }
  // if (currentuser.email != res.locals.user.email) {
  //   return res.status(404).json("Please login !!");
  // }

  // 4.Check if user changed password after  token was issued
  //   if (currentuser.passwordChanged(decoded.iat)) {
  //     return next(
  //       new AppError("The user has changed password , Please login again !!", 401)
  //     );
  //   }

  // console.log(token);
  // Grant acess to login user
  req.user = currentuser;
  res.locals.user = currentuser;
  next();
};

// Only for rendering pages no erros!!
exports.isLoggedIn = async (req, res, next) => {
  try {
    // console.log("stra");
    if (req.cookies.jwt) {
      // 1.Verification of token
      // console.log("stra");
      const decoded = await promisify(jwt.verify)(
        req.cookies.jwt,
        "secret_key"
      );
      // console.log(decoded);
      // 2.Check if user still exists on the token
      const currentuser = await User.findById(decoded.userId);
      if (!currentuser) {
        return next();
      }

      // 3.Check if user changed password after  token was issued
      // if (currentuser.passwordChanged(decoded.iat)) {
      //   return next();
      // }

      // console.log(token);
      // All pug templates have acces to the req.locals
      req.user = currentuser;
      res.locals.user = currentuser;
      // console.log("working");
      next();
    } else {
      // console.log("kjj");
      next();
    }
  } catch (err) {
    // console.log("kjj");
    next();
  }
};

exports.isBin = async (req, res, next) => {
  try {
    // console.log("stra");
    if (req.cookies.jwt) {
      // 1.Verification of token
      // console.log("stra");
      const decoded = await promisify(jwt.verify)(
        req.cookies.jwt,
        "secret_key"
      );
      // console.log(decoded);
      // 2.Check if user still exists on the token
      const currentuser = await User.findById(decoded.userId);
      if (!currentuser) {
        return next();
      }

      // 3.Check if user changed password after  token was issued
      // if (currentuser.passwordChanged(decoded.iat)) {
      //   return next();
      // }

      // console.log(token);
      // All pug templates have acces to the req.locals
      req.user = currentuser;
      res.locals.user = currentuser;
      // console.log("working");
      next();
    } else {
      // console.log("kjj");
      next();
    }
  } catch (err) {
    // console.log("kjj");
    next();
  }
};
