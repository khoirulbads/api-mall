// Dependecies
const _omit = require("lodash/omit");
const moment = require("moment-timezone");
const axios = require("axios");
const pick = require("lodash/pick");

module.exports = (fastify, log) => {
  // For logging every request to this app
  fastify.addHook("onResponse", (req, reply, done) => {
    const logging = {
      res: {
        statusCode: reply.raw.statusCode,
      },
      request: {
        method: req.raw.method,
        url: req.raw.url,
        hostname: req.hostname,
        "user-agent": req.headers["user-agent"],
        ip: req.ip,
        complete: req.raw.complete,
        aborted: req.raw.aborted,
      },
      user: req.user,
      params: req.params,
      query: req.query,
      body: _omit(req.body, "password"),
      time: moment().tz("Asia/Jakarta").format("YYYY-MM-DD HH:mm:ss"),
    };
    req.log.info(logging);
    done();
  });

  // For logging every axios request
  axios.interceptors.request.use((req) => {
    log.info(
      pick(req, ["url", "method", "params", "data", "headers", "auth"]),
      "Request axios"
    );
    return req;
  });

  axios.interceptors.response.use((res) => {
    log.info(
      pick(res, [
        "status",
        "statusText",
        "headers",
        "data",
        "config.url",
        "config.method",
        "config.params",
        "config.data",
        "config.headers",
        "config.auth",
      ]),
      "Response axios"
    );
    return res;
  });
};
