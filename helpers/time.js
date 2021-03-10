const mongoose = require("mongoose");
const Puid = require("puid");

module.exports = {
  wait: async (ms) =>
    new Promise((resolve) => {
      setTimeout(resolve, ms);
    }),
};
