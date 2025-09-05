
import type { Reaction } from "../../Domain/models/Reaction";
import type { IReactionService } from "../../Domain/services/reactions/IReactionService";
import type { IReactionRepository } from "../../Domain/repositories/reactions/IReactonRepository";
import type { IReportRepository } from "../../Domain/repositories/reports/IReportRepository";

export class ReactionService implements IReactionService {
  constructor(
    private reactionRepo: IReactionRepository,
    private reportRepo: IReportRepository
  ) {}

  async getReactionForUser(reportId: number, userId: number): Promise<Reaction | null> {
    return await this.reactionRepo.getByReportAndUser(reportId, userId);
  }

  async getReactionsForUserForReports(reportIds: number[], userId: number): Promise<Reaction[]> {
    return await this.reactionRepo.getByReportIdsAndUser(reportIds, userId);
  }

  async dodajReakciju(reportId: number, userId: number, reakcija: 'like'|'dislike'|'neutral'): Promise<Reaction | null> {
    const report = await this.reportRepo.getById(reportId);
    if (!report || report.id === 0) {
      throw new Error("Prijava nije pronađena.");
    }

    const created = await this.reactionRepo.upsert(reportId, userId, reakcija);
    return created;
  }

  async countByReport(reportId: number): Promise<Record<string, number>> {
    return await this.reactionRepo.countByReport(reportId);
  }
}