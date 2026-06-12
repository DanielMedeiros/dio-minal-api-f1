import { F1Drivers2026 } from "../../domain/enums/drivers.enum";

export class GetDriversUseCase {
  execute(): string[] {
    return Object.values(F1Drivers2026);
  }
}
