// Dependecies
const _omit = require("lodash/omit");

module.exports = (fastify) => {
  fastify.setErrorHandler((err, req, reply) => {
    if (err.isAxiosError) {
      console.error(_omit(err, "request"), "Terjadi error AXIOS");
    } else {
      console.error(err, "Terjadi error");
    }
    reply.failed(err.message, err.statusCode || 500);
  });
  fastify.setNotFoundHandler(function (request, reply) {
    reply.failed("Endpoint's not found", 404);
  });
};
