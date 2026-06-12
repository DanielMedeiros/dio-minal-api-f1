import { describe, it, expect, beforeEach } from "@jest/globals";
import { GetTeamByNameUseCase } from "../src/application/use-cases/get-team-by-name.usecase";
import { GetTeamsUseCase } from "../src/application/use-cases/get-teams.usecase";

describe("GetTeamByNameUseCase", () => {
  let useCase: GetTeamByNameUseCase;
  let getTeams: GetTeamsUseCase;

  beforeEach(() => {
    useCase = new GetTeamByNameUseCase();
    getTeams = new GetTeamsUseCase();
  });

  it("should return a team when a valid name is provided", () => {
    const teams = getTeams.execute();
    const validName = teams[0];
    const result = useCase.execute(validName);

    expect(result.team).toBe(validName);
    expect(result.error).toBeUndefined();
  });

  it("should return the specified error message when team is not found", () => {
    const name = "Equipe Fantasma";
    const result = useCase.execute(name);

    expect(result.team).toBeNull();
    expect(result.error).toBe(`A equipe '${name}' não faz parte da F1 2026`);
  });
});
