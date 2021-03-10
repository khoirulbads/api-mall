// Dependecies
const { boomify } = require("@hapi/boom");
const axios = require("axios");

// Config
const { ipBalance } = require("../config");

exports.mutasiSaldo = async ({
  type,
  amount,
  ipClient,
  trxId,
  nohp,
  ankId,
}) => {
  try {
    const data = { type, amount, ipClient, trxId };

    const mutasi = await axios.post(`${ipBalance}balance`, data, {
      auth: { username: nohp, password: ankId },
    });

    return mutasi.data.data.tagihan;
  } catch (err) {
    if (err.isAxiosError && err.response) {
      throw new Error(err.response.data.message);
    } else {
      throw boomify(err);
    }
  }
};
