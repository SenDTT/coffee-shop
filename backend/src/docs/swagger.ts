// src/docs/swagger.ts
import swaggerJsdoc from "swagger-jsdoc";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Coffee Shop API",
      version: "1.0.0",
      description: "My Coffee Shop API documentation",
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
    servers: [
      {
        url: "http://localhost:5002",
      },
    ],
  },
  apis: ["./src/docs/swagger/**/*.ts"], // Points to your route files
};

const swaggerSpec = swaggerJsdoc(options);
export default swaggerSpec;
