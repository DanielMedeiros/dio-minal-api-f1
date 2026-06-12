import { FastifyInstance } from "fastify";
import { F1Controller } from "../controllers/f1.controller";

export async function f1Routes(fastify: FastifyInstance) {
  fastify.get("/teams", F1Controller.getTeams);
  fastify.get("/drivers", F1Controller.getDrivers);
}
