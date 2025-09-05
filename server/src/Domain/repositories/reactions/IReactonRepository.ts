import type { Reaction } from "../../models/Reaction";
import type { Reakcije } from "../../types/Reakcije";

export interface IReactonRepository {

  getByReportAndUser(reportId: number, userId: number): Promise<Reaction | null>;
  upsert(reportId: number, userId: number, reakcija: Reakcije): Promise<Reaction | null>;
  getByReportIdsAndUser(reportIds: number[], userId: number): Promise<Reaction[]>;
  countByReport(reportId: number): Promise<Record<string, number>>;
}

export type IReactionRepository = IReactonRepository;
