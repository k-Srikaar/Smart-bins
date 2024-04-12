const mongoose = require("mongoose");

const gsmSchema = new mongoose.Schema({
  Bin: {
    type: String,
    required: true,
  },
  coordinates: {
    type: Array,
    required: true,
  },
  persentagefill: {
    type: Number,
    required: true,
  },
});

const GSM = mongoose.model("GSM", gsmSchema);
module.exports = GSM;
