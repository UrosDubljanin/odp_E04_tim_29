import axios from "axios";
import { PročitajVrednostPoKljuču } from "../../helpers/local_storage";
import type { KvarDto } from "../../models/kvar/KvarDto";
import type { ApiResponse } from "../../types/API/ApiResponse";
import type { IKvarAPIService } from "./IKvarAPIService";
import type { QueryParams } from "../../types/pomocne/QueryParms";
import type { CreateReportPayload } from "../../types/kvarovi/CreateReportPayload";


const RAW_API = import.meta.env.VITE_API_URL ?? "http://localhost:4000/api/v1";
const API_BASE = RAW_API.endsWith("/") ? RAW_API : RAW_API + "/";
const API_URL: string = API_BASE + "kvarovi";

export const KvarApi: IKvarAPIService = {
    getSviKvarovi: async function (params?: QueryParams): Promise<ApiResponse<KvarDto[]>> {
        try {
            const token = PročitajVrednostPoKljuču("authToken");

            const res = await axios.get<ApiResponse<KvarDto[]>>(`${API_URL}/all`, {
                params,
                headers: token ? { Authorization: `Bearer ${token}` } : undefined,
            });
            return res.data;
        } catch (error) {
            let message = "Greska prilikom preuzimanja kvarova.";
            if (axios.isAxiosError(error)) {
                message = error.response?.data?.message || message;
            }
            return { success: false, message, data: [] };
        }
    },
    getKvaroveKorisnika: async function (params?: QueryParams): Promise<KvarDto[]> {
        try {
            const token = PročitajVrednostPoKljuču("authToken");

            const res = await axios.get<KvarDto[]>(`${API_URL}`, {
                params,
                headers: token ? { Authorization: `Bearer ${token}` } : undefined,
            });
            return res.data;
        } catch (error) {
            let message = "Greska prilikom preuzimanja vasih kvarova.";
            if (axios.isAxiosError(error)) {
                message = error.response?.data?.message || message;
            }
            return [];
        }
    },

    kreirajKvar: async function (payload: CreateReportPayload | FormData): Promise<ApiResponse<KvarDto>> {
        try {
            const token = PročitajVrednostPoKljuču("authToken");
            const res = await axios.post<ApiResponse<KvarDto>>(`${API_URL}`, payload, {
                headers: token ? { Authorization: `Bearer ${token}` } : undefined,
            });
            return res.data;
        } catch (error) {
            let message = "Greska pri kreiranju kvara.";
            if (axios.isAxiosError(error)) {
                message = error.response?.data?.message || message;
            }
            return { success: false, message };
        }
    },
    getKvarById: async function (id: number): Promise<ApiResponse<KvarDto>> {
        try {
            const token = PročitajVrednostPoKljuču("authToken");
            const res = await axios.get<ApiResponse<KvarDto>>(`${API_URL}/${id}`, {
                headers: token ? { Authorization: `Bearer ${token}` } : undefined,
            });
            return res.data;
        } catch (error) {
            let message = "Greska pri preuzimanju kvara.";
            if (axios.isAxiosError(error)) {
                message = error.response?.data?.message || message;
            }
            return { success: false, message };
        }
    },
    prihvatiKvar: async function (id: number): Promise<ApiResponse<null>> {
        try {
            const token = PročitajVrednostPoKljuču("authToken");
            const res = await axios.put<ApiResponse<null>>(`${API_URL}/${id}/accept`, null, {
                headers: token ? { Authorization: `Bearer ${token}` } : undefined,
            });
            return res.data;
        } catch (error) {
            let message = "Greska pri prihvatanju kvara.";
            if (axios.isAxiosError(error)) {
                message = error.response?.data?.message || message;
            }
            return { success: false, message };
        }
    },
    zavrsiKvar: function (id: number, saniran: boolean, comment?: string, cena?: number): Promise<ApiResponse<null>> {
        throw new Error("Function not implemented.");
    },
}