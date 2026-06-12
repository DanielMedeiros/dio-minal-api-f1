import { GetTeamsUseCase } from "./get-teams.usecase";

export class GetTeamByNameUseCase {
  private getTeamsUseCase = new GetTeamsUseCase();

  execute(name: string): { team: string | null; error?: string } {
    const teams = this.getTeamsUseCase.execute();
    const team = teams.find((t) => t.toLowerCase() === name.toLowerCase());

    if (!team) {
      return {
        team: null,
        error: `A equipe '${name}' não faz parte da F1 2026`,
      };
    }

    return { team };
  }
}
