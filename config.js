require("dotenv").config();
const version = require("./package.json").version;

module.exports = {
  app: {
    port: process.env.PORT || 3000,
    logger: { level: "info" },
  },
  cors: {
    origin: true,
    methods: ["OPTIONS", "GET", "PUT", "PATCH", "POST", "DELETE"],
    maxAge: 90,
  },
  jwt: {
    secret: process.env.JWTSECRET,
    sign: {
      expiresIn: 30,
      algorithm: "HS512",
    },
  },
  db: {
    connectionString: process.env.DB_URI,
    options: {
      useCreateIndex: true,
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    },
  },
  redis: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PASS,
  },
  secret: {
    hmac: process.env.SHMAC,
    saldo: process.env.SSALDO,
    hash: process.env.SHASH,
    supplier: process.env.SSUPPLIER,
  },
  ipBalance: process.env.IPBALANCE,
  oneSignal: {
    appId: process.env.APP_ID,
    appKey: process.env.APP_KEY,
  },
  swagger: {
    routePrefix: "/docs",
    exposeRoute: true,
    swagger: {
      info: {
        title: "Kios Aneka Mall Back-end API",
        description: "Back-end API for Aneka-Util platform.",
        version,
      },
      host: `localhost:${process.env.PORT}`,
      schemes: ["http"],
      consumes: ["application/json"],
      produces: ["application/json"],
      securityDefinitions: {
        bearerJWT: {
          type: "apiKey",
          name: "Authorization",
          in: "header",
          description: "Ambil bearer dari api data",
        },
      },
      security: [{ bearerJWT: [] }],
    },
  },
};
