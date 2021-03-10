// Dependecies
const Boom = require("@hapi/boom");
const moment = require("moment");
const crypto = require("crypto");
// Models
const User = require("../modules/pengguna/pemilik.model");
require("../modules/pengguna/toko.model");

module.exports = (fastify) => {
  // General decorators
  fastify.decorateRequest("user", {});
  // Decorators hooks preHandler
  fastify.decorate("verifyAuth", async function (req, reply) {
    try {
      const { userInfo } = await req.jwtVerify();
      const user = await User.findById(
        userInfo._id,
        "isBlocked nohp playerId ankId isBlackList deleteOn"
      )
        .lean()
        .populate("toko", "namaToko");

      if (!user) return reply.failed("Unauthorized.", 401);
      if (user.isBlocked || user.isBlackList || user.deleteOn)
        return reply.failed("Unauthorized.", 403);
      if (!user.toko) return reply.failed("Hanya untuk toko", 403);

      const token = req.headers.authorization.replace(/^Bearer /i, "");
      const customHeader = crypto
        .createHmac("sha256", token)
        .update(
          `${moment().format("DDMM")}${user.nohp}${moment().format("YYYY")}`
        )
        .digest("hex");

      if (
        req.headers[`${user.nohp}-${moment().format("DDMMYYYY")}`] !=
        customHeader
      ) {
        return reply.failed("Unauthorized.", 403);
      }

      req.user = user;

      return;
    } catch (err) {
      throw Boom.boomify(err);
    }
  });
};
