
import type { KvarDto } from "../../models/kvar/KvarDto";
import type { ApiResponse } from "../../types/API/ApiResponse";

export interface IKvarAPIService {
  getSviKvarovi(status?: string, sortBy?: string, order?: "ASC" | "DESC"): Promise<ApiResponse<KvarDto[]>>;

  
  getKvaroveKorisnika(status?: string, sortBy?: string, order?: "ASC" | "DESC"): Promise<ApiResponse<KvarDto[]>>;

 
  kreirajKvar(naslov: string | null, opis: string, adresa: string, slika?: string | null | FormData): Promise<ApiResponse<KvarDto>>;

  getPrijavaById(id: number): Promise<ApiResponse<KvarDto>>;

  prihvatiKvar(id: number): Promise<ApiResponse<null>>;

  zavrsiKvar(id: number, saniran: boolean, comment?: string, cena?: number): Promise<ApiResponse<null>>;
}