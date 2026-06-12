import "dotenv/config";
import Fastify from "fastify";
import cors from "@fastify/cors";
import helmet from "@fastify/helmet";
import swagger from "@fastify/swagger";
import swaggerUi from "@fastify/swagger-ui";
import { f1Routes } from "./presentation/routes/f1.routes";

const app = Fastify({ logger: true });

app.addHook("onClose", async (_instance) => {
  app.log.info("Fechando servidor...");
});

async function bootstrap() {
  await app.register(helmet);

  await app.register(cors, {
    origin: "*",
    methods: ["GET"],
  });

  await app.register(swagger, {
    openapi: {
      openapi: "3.0.0",
    },
    swagger: {
      info: {
        title: "F1 Minimal API",
        description:
          "Documentação interativa da API de Fórmula 1 (Temporada 2026)",
        version: "1.0.0",
      },
    },
  });

  await app.register(swaggerUi, {
    routePrefix: "/docs",
    staticCSP: true,
    transformStaticCSP: (header) => header,
    uiConfig: {
      docExpansion: "list",
      deepLinking: false,
    },
  });

  await app.register(f1Routes, { prefix: "/api/v1" });

  try {
    const port = process.env.PORT ? Number(process.env.PORT) : 3333;
    await app.listen({ port, host: "0.0.0.0" });
    app.log.info(`🏁 F1 API rodando em http://localhost:${port}/api/v1`);
    app.log.info(
      `📚 Documentação Swagger disponível em http://localhost:${port}/docs`,
    );
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
}

bootstrap();
