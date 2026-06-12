import { describe, it, expect, beforeEach } from "@jest/globals";
import { GetDriverByNameUseCase } from "../src/application/use-cases/get-driver-by-name.usecase";
import { GetDriversUseCase } from "../src/application/use-cases/get-drivers.usecase";

describe("GetDriverByNameUseCase", () => {
  let useCase: GetDriverByNameUseCase;
  let getDrivers: GetDriversUseCase;

  beforeEach(() => {
    useCase = new GetDriverByNameUseCase();
    getDrivers = new GetDriversUseCase();
  });

  it("should return a driver when a valid name is provided", () => {
    const drivers = getDrivers.execute();
    const validName = drivers[0]; // Busca o primeiro piloto real da lista
    const result = useCase.execute(validName);

    expect(result.driver).not.toBeNull();
    expect(result.driver).toBe(validName);
    expect(result.error).toBeUndefined();
  });

  it("should return an error message when driver is not found", () => {
    const name = "Piloto Inexistente";
    const result = useCase.execute(name);

    expect(result.driver).toBeNull();
    expect(result.error).toBe(`O Piloto '${name}' não faz parte da F1 2026`);
  });
});
