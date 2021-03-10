// Config
const { app } = require("./config");
const logger = require("pino")(app.logger);
// Init
const fastify = require("fastify")({ logger });

require("./core/plugins")(fastify);
require("./core/responses")(fastify);
require("./core/errorHandler")(fastify);
require("./core/logging")(fastify, logger);
require("./core/auth")(fastify);
require("./core/database")();

fastify.get("/", async () => ({ hello: "Lets Start Api Kios Shop" }));

const abc = require("crypto")
  .createHmac(
    "sha256",
    "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mbyI6eyJfaWQiOiI2MDA4ZmJlZDZmN2YzMzc2Y2FjYTk1YjMiLCJub2hwIjoiMDg1NzM2NjQ1NzcyIiwicGxheWVySWQiOiI3NzFjZjM0Mi05YmI1LTQ1MWYtOTc4NS03MDZkNzU3M2RkZjQifSwiaWF0IjoxNjExNTYyNjI5LCJleHAiOjE2MTUxNjI2Mjl9.7iOY8UQkYpiZbwX9WbLO6AMYryRh_gHIYoiUe6emon15bTwoALO_DCAwizYgeowkFJdzCe2iUtIQ6iJvPyjMzw"
  )
  .update("25010857366457722021")
  .digest("hex");
console.log(abc);

const start = async () => {
  try {
    await fastify.listen(app.port);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
