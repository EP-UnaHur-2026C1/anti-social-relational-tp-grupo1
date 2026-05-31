require("dotenv").config();

const express = require("express");
const app = express();
const db = require("../models");

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
  apis: ["./routes/**/*.js"],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(express.json());

const usuarioRoutes = require("../routes/usuario.routes");
const postRoutes = require("../routes/post.routes");
const tagRoutes = require("../routes/tag.routes");
const postImagenRoutes = require("../routes/postimagen.routes");
const comentarioRoutes = require("../routes/comentario.routes");

app.use("/usuarios", usuarioRoutes);
app.use("/posts", postRoutes);
app.use("/tags", tagRoutes);
app.use("/postimagenes", postImagenRoutes);
app.use("/comentarios", comentarioRoutes);

app.listen(PORT, async () => {
  await db.sequelize.sync();
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
  console.log(`Swagger disponible en http://localhost:${PORT}/api-docs`);
});
