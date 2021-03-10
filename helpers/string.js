const mongoose = require("mongoose");
const Puid = require("puid");

module.exports = {
  padZeroes: (number, length) => {
    let s = String(number);
    while (s.length < length) {
      s = "0" + s;
    }
    return s;
  },
  IDTransaksi: () => mongoose.Types.ObjectId(),
  IDRequest: (msisdn) => {
    const puid = new Puid({ msisdn });
    return puid.generate();
  },
  reverse: (string) => string.split("").reverse().join(""),
};
