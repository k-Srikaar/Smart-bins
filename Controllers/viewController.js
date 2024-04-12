const User = require("./../Model/user");
const GMS = require("./../Model/gsm");

exports.overview = async (req, res, next) => {
  // console.log("kkj");
  res.render("index", {
    message: "",
    title: "overview",
  });
};

exports.login = (req, res, next) => {
  res.render("login", {
    title: "Login",
  });
};

exports.signup = (req, res, next) => {
  // const filePath = path.resolve(__dirname, "login");

  res.render("signup", {
    title: "Signup",
  });
};

exports.binstatus = async (req, res, next) => {
  // const bins = await GMS.find();
  res.render("binddetails", {
    title: "Bin status",
  });
};

exports.feedback = (req, res, next) => {
  res.render("feedback", {
    title: "Feedback-form",
  });
};

exports.index = (req, res, next) => {
  res.render("index", {
    title: "Overview",
  });
};

exports.alert = (req, res, next) => {
  res.render("alert", {
    title: "Alert",
  });
};
