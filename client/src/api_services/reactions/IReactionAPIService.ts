// src/api_services/reactions/IReactionAPIService.ts
import type { ApiResponse } from "../../types/API/ApiResponse";
import type { ReactionType } from "../../types/reactions/ReactionType";

export interface IReactionAPIService {

  dodajReakciju(id: number, tip: Exclude<ReactionType, null>): Promise<ApiResponse<null>>;
  getReakcija(id: number): Promise<ApiResponse<{ tip: ReactionType | null }>>;
}
