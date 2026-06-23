import { FastifyInstance } from "fastify";
import { F1Controller } from "../controllers/f1.controller";

export async function f1Routes(fastify: FastifyInstance) {
  fastify.get(
    "/teams",
    {
      schema: {
        description:
          "Retorna a lista de todas as equipas/construtores da temporada de 2026",
        tags: ["Equipas"],
        response: {
          200: {
            type: "object",
            properties: {
              data: {
                type: "array",
                items: { type: "string" },
                maxItems: 100,
              },
            },
          },
        },
      },
    },
    F1Controller.getTeams,
  );

  fastify.get<{ Params: { name: string } }>(
    "/teams/:name",
    {
      schema: {
        description: "Pesquisa uma equipe pelo nome para a temporada de 2026",
        tags: ["Equipas"],
        params: {
          type: "object",
          properties: {
            name: { type: "string" },
          },
        },
        response: {
          200: {
            type: "object",
            properties: {
              data: { type: "string" },
            },
          },
          404: {
            type: "object",
            properties: {
              message: { type: "string" },
            },
          },
        },
      },
    },
    F1Controller.getTeamByName,
  );

  fastify.get(
    "/drivers",
    {
      schema: {
        description:
          "Retorna a lista de todos os pilotos projetados para a temporada de 2026",
        tags: ["Pilotos"],
        response: {
          200: {
            type: "object",
            properties: {
              data: {
                type: "array",
                items: { type: "string" },
                maxItems: 100,
              },
            },
          },
        },
      },
    },
    F1Controller.getDrivers,
  );

  fastify.get<{ Params: { name: string } }>(
    "/drivers/:name",
    {
      schema: {
        description: "Pesquisa um piloto pelo nome para a temporada de 2026",
        tags: ["Pilotos"],
        params: {
          type: "object",
          properties: {
            name: { type: "string" },
          },
        },
        response: {
          200: {
            type: "object",
            properties: {
              data: { type: "string" },
            },
          },
          404: {
            type: "object",
            properties: {
              message: { type: "string" },
            },
          },
        },
      },
    },
    F1Controller.getDriverByName,
  );
}
