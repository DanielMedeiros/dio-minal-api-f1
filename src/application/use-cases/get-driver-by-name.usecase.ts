import { GetDriversUseCase } from "./get-drivers.usecase";

export class GetDriverByNameUseCase {
  private getDriversUseCase = new GetDriversUseCase();

  execute(name: string): { driver: string | null; error?: string } {
    const drivers = this.getDriversUseCase.execute();
    const driver = drivers.find((d) => d.toLowerCase() === name.toLowerCase());

    if (!driver) {
      return {
        driver: null,
        error: `O Piloto '${name}' não faz parte da F1 2026`,
      };
    }

    return { driver };
  }
}
