import Fastify from "fastify";
import cors from "@fastify/cors";
import helmet from "@fastify/helmet";
import { f1Routes } from "./presentation/routes/f1.routes";

const app = Fastify({ logger: true });

async function bootstrap() {
  // Segurança: Adiciona headers de proteção padrão
  await app.register(helmet);

  // CORS: Permite que outras aplicações consumam a API
  await app.register(cors, {
    origin: "*", // Mude para o domínio do seu front-end em produção
    methods: ["GET"],
  });

  // Registra as rotas
  await app.register(f1Routes, { prefix: "/api/v1" });

  try {
    const port = process.env.PORT ? Number(process.env.PORT) : 3333;
    await app.listen({ port, host: "0.0.0.0" });
    app.log.info(`🏁 F1 API rodando em http://localhost:${port}/api/v1`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
}

bootstrap();
