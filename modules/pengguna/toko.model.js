// Dependencies
const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

// Schema
const schema = new mongoose.Schema({
  nohp: String,
  namaToko: String,
  alamat: String,
  provinsi: String,
  kabupaten: String,
  kecamatan: String,
  lokasiToko: String,
  status: String,
  hari: Number,
  plafon: String,
  lng: String,
  lat: Boolean,
  ankId: String,
  kodeVisit: Date,
  createdAt: Date,
  idCollector: {
    type: ObjectId,
    ref: "Collector",
  },
});

// Virtual
schema.virtual("pemilik", {
  ref: "User",
  localField: "ankId",
  foreignField: "ankId",
  justOne: true,
});

module.exports = mongoose.model("Agen", schema, "agen");
