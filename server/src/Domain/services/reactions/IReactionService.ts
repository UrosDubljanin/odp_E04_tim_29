import type { Reaction } from "../../models/Reaction";

export interface IReactionService {
  getReactionForUser(reportId: number, userId: number): Promise<Reaction | null>;
  getReactionsForUserForReports(reportIds: number[], userId: number): Promise<Reaction[]>;
  dodajReakciju(reportId: number, userId: number, reakcija: 'like'|'dislike'|'neutral'): Promise<Reaction | null>;
  countByReport(reportId: number): Promise<Record<string, number>>;
}
