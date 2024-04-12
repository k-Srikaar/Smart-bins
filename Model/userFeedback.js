const mongoose = require("mongoose");

const userFeedbackSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  feedback: {
    type: String,
    required: true,
  },
});

const UserFeedback = mongoose.model("UserFeedback", userFeedbackSchema);
module.exports = UserFeedback;
