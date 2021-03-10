// Dependencies
const mongoose = require("mongoose");

// Schema
const schema = new mongoose.Schema({
  nohp: String,
  email: String,
  nama: String,
  alamat: String,
  provinsi: String,
  kabupaten: String,
  kecamatan: String,
  hashPassword: String,
  imei: String,
  log: Object,
  device: Object,
  playerId: String,
  ankId: String,
  pincode: String,
  isBlocked: Boolean,
  isBlackList: Boolean,
  createdAt: Date,
  deleteOn: Date,
});

// Virtual
schema.virtual("toko", {
  ref: "Agen",
  localField: "ankId",
  foreignField: "ankId",
  justOne: true,
});

module.exports = mongoose.model("User", schema, "users");
