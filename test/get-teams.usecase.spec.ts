import { describe, it, expect, beforeEach } from "@jest/globals";
import { GetTeamsUseCase } from "../src/application/use-cases/get-teams.usecase";

describe("GetTeamsUseCase", () => {
  let useCase: GetTeamsUseCase;

  beforeEach(() => {
    useCase = new GetTeamsUseCase();
  });

  it("should return a list of teams", () => {
    const result = useCase.execute();
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);
  });
});
