const mongoose = require("mongoose");

const emailSchema = new mongoose.Schema({
  to: { type: String, required: true },
  subject: { type: String, required: true },
  text: { type: String, required: true },
  scheduledAt: { type: Date, required: true },
});

module.exports = mongoose.model("Email", emailSchema);