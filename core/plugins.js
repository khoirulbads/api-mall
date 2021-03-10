const { cors, swagger, jwt } = require("../config");

module.exports = (fastify) => {
  fastify.register(require("fastify-jwt"), jwt);
  fastify.register(require("fastify-formbody"));
  fastify.register(require("fastify-cors"), cors);
  if (process.env.NODE_ENV == "production") {
    fastify.register(require("fastify-helmet"));
  } else {
    fastify.register(require("fastify-swagger"), swagger);
    fastify.register(require("fastify-helmet"), (instance) => {
      return {
        contentSecurityPolicy: {
          directives: {
            defaultSrc: ["'self'"], // default source is mandatory
            imgSrc: ["'self'", "data:", "validator.swagger.io"],
            scriptSrc: ["'self'"].concat(instance.swaggerCSP.script),
            styleSrc: ["'self'", "https:"].concat(instance.swaggerCSP.style),
          },
        },
      };
    });
  }
};
