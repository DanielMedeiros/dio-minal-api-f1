import { FastifyRequest, FastifyReply } from "fastify";
import { GetTeamsUseCase } from "../../application/use-cases/get-teams.usecase";
import { GetDriversUseCase } from "../../application/use-cases/get-drivers.usecase";

export class F1Controller {
  private static getTeamsUseCase = new GetTeamsUseCase();
  private static getDriversUseCase = new GetDriversUseCase();

  static async getTeams(request: FastifyRequest, reply: FastifyReply) {
    const teams = F1Controller.getTeamsUseCase.execute();
    return reply.status(200).send({ data: teams });
  }

  static async getDrivers(request: FastifyRequest, reply: FastifyReply) {
    const drivers = F1Controller.getDriversUseCase.execute();
    return reply.status(200).send({ data: drivers });
  }
}
