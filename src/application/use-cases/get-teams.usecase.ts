import { F1Teams2026 } from "../../domain/enums/teams.enum";

export class GetTeamsUseCase {
  execute(): string[] {
    return Object.values(F1Teams2026);
  }
}
