
import type { KvarDto } from "../../models/kvar/KvarDto";
import type { ApiResponse } from "../../types/API/ApiResponse";
import type { CreateReportPayload } from "../../types/kvarovi/CreateReportPayload";
import type { QueryParams } from "../../types/pomocne/QueryParms";

export interface IKvarAPIService {
  getSviKvarovi(params?: QueryParams): Promise<ApiResponse<KvarDto[]>>;

  
  getKvaroveKorisnika(params?: QueryParams): Promise<KvarDto[]>;
 
  kreirajKvar(payload: CreateReportPayload | FormData): Promise<ApiResponse<KvarDto>>;

  getKvarById(id: number): Promise<ApiResponse<KvarDto>>;

  prihvatiKvar(id: number): Promise<ApiResponse<null>>;

  zavrsiKvar(id: number, saniran: boolean, comment?: string, cena?: number): Promise<ApiResponse<null>>;
}