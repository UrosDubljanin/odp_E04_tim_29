import type { KvarDto } from "../../models/kvar/KvarDto";
import type { ApiResponse } from "../../types/API/ApiResponse";
import type { IKvarAPIService } from "./IKvarAPIService";


const RAW_API = import.meta.env.VITE_API_URL ?? "http://localhost:4000/api/v1";
const API_BASE = RAW_API.endsWith("/") ? RAW_API : RAW_API + "/";
const API_URL: string = API_BASE + "reports";

export const KvarApi: IKvarAPIService = {
    getSviKvarovi: function (status?: string, sortBy?: string, order?: "ASC" | "DESC"): Promise<ApiResponse<KvarDto[]>> {
        throw new Error("Function not implemented.");
    },
    getKvaroveKorisnika: function (status?: string, sortBy?: string, order?: "ASC" | "DESC"): Promise<ApiResponse<KvarDto[]>> {
        throw new Error("Function not implemented.");
    },
    kreirajKvar: function (naslov: string | null, opis: string, adresa: string, slika?: string | null | FormData): Promise<ApiResponse<KvarDto>> {
        throw new Error("Function not implemented.");
    },
    getPrijavaById: function (id: number): Promise<ApiResponse<KvarDto>> {
        throw new Error("Function not implemented.");
    },
    prihvatiKvar: function (id: number): Promise<ApiResponse<null>> {
        throw new Error("Function not implemented.");
    },
    zavrsiKvar: function (id: number, saniran: boolean, comment?: string, cena?: number): Promise<ApiResponse<null>> {
        throw new Error("Function not implemented.");
    }
}