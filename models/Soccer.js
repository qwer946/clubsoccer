// we are adding mongoose to this file
const mongoose = require("mongoose");

// we are creating a new book schema object.
const clubSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  img: String,
  founded: Number,
});

const Club = mongoose.model("Club", clubSchema);

module.exports = Club;
