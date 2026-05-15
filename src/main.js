const express = require("express");
const app = express();
const db = require("../models");

require("dotenv").config();
const PORT = process.env.PORT || 3000;

// Swagger
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Anti Social Relational API",
      version: "1.0.0",
      description: "API para la red social Anti Social",
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
      },
    ],
  },
  apis: ["./src/**/*.js"],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(express.json());

app.listen(PORT, async () => {
  await db.sequelize.sync();
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
  console.log(`Swagger disponible en http://localhost:${PORT}/api-docs`);
});