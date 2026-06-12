import Fastify from "fastify";
import cors from "@fastify/cors";
import helmet from "@fastify/helmet";
import swagger from "@fastify/swagger";
import swaggerUi from "@fastify/swagger-ui";
import { f1Routes } from "./presentation/routes/f1.routes";

const app = Fastify({ logger: true });

async function bootstrap() {
  // Segurança
  await app.register(helmet);

  // CORS
  await app.register(cors, {
    origin: "*",
    methods: ["GET"],
  });

  // 1. Configuração do Core do Swagger (Documentação JSON)
  await app.register(swagger, {
    swagger: {
      info: {
        title: "F1 Minimal API",
        description:
          "Documentação interativa da API de Fórmula 1 (Temporada 2026)",
        version: "1.0.0",
      },
      host: "localhost:3333",
      schemes: ["http"],
      consumes: ["application/json"],
      produces: ["application/json"],
    },
  });

  // 2. Configuração da Interface Gráfica do Swagger UI
  await app.register(swaggerUi, {
    routePrefix: "/docs",
    uiConfig: {
      docExpansion: "list",
      deepLinking: false,
    },
  });

  // Registar as rotas após o Swagger
  await app.register(f1Routes, { prefix: "/api/v1" });

  try {
    const port = process.env.PORT ? Number(process.env.PORT) : 3333;
    await app.listen({ port, host: "0.0.0.0" });
    console.log(`🏁 F1 API rodando em http://localhost:${port}/api/v1`);
    console.log(
      `📚 Documentação Swagger disponível em http://localhost:${port}/docs`,
    );
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
}

bootstrap();
