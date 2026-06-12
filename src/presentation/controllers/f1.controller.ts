import { FastifyRequest, FastifyReply } from "fastify";
import { GetTeamsUseCase } from "../../application/use-cases/get-teams.usecase";
import { GetDriversUseCase } from "../../application/use-cases/get-drivers.usecase";
import { GetDriverByNameUseCase } from "../../application/use-cases/get-driver-by-name.usecase";
import { GetTeamByNameUseCase } from "../../application/use-cases/get-team-by-name.usecase";

export class F1Controller {
  private static getTeamsUseCase = new GetTeamsUseCase();
  private static getDriversUseCase = new GetDriversUseCase();
  private static getDriverByNameUseCase = new GetDriverByNameUseCase();
  private static getTeamByNameUseCase = new GetTeamByNameUseCase();

  static async getTeams(request: FastifyRequest, reply: FastifyReply) {
    const teams = F1Controller.getTeamsUseCase.execute();
    return reply.status(200).send({ data: teams });
  }

  static async getDrivers(request: FastifyRequest, reply: FastifyReply) {
    const drivers = F1Controller.getDriversUseCase.execute();
    return reply.status(200).send({ data: drivers });
  }

  static async getDriverByName(
    request: FastifyRequest<{ Params: { name: string } }>,
    reply: FastifyReply,
  ) {
    const { name } = request.params;
    const { driver, error } = F1Controller.getDriverByNameUseCase.execute(name);

    if (error) {
      return reply.status(404).send({ message: error });
    }

    return reply.status(200).send({ data: driver });
  }

  static async getTeamByName(
    request: FastifyRequest<{ Params: { name: string } }>,
    reply: FastifyReply,
  ) {
    const { name } = request.params;
    const { team, error } = F1Controller.getTeamByNameUseCase.execute(name);

    if (error) {
      return reply.status(404).send({ message: error });
    }

    return reply.status(200).send({ data: team });
  }
}
