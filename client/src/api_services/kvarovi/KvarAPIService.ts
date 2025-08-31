import axios from "axios";
import type { Kvar } from "../../models/kvar/Kvar";
import type { IKvarAPIService } from "./IKvarAPIService";



const API_URL: string = import.meta.env.VITE_API_URL + "kvar";


function authHeader(token: string) {
    return { Authorization: `Bearer ${token}` };
}

function normalizeToArray<T>(x: T | T[] | undefined | null): T[] {
    if (!x) return [];
    return Array.isArray(x) ? x : [x];
}

type ApiEnvelope<T> = { success: boolean; message?: string; data?: T };

export const kvarAPI : IKvarAPIService ={
    getMojeKvarove: async function (token: string, userId: number): Promise<Kvar[]> {
        const res = await axios.get(`${API_URL}/user/${userId}`, { headers: authHeader(token) });
        if (!res.data.success) throw new Error(res.data.message || "Greška pri učitavanju kvarova.");
        return normalizeToArray(res.data.data);
    },
    getAllKvar: async function (token: string): Promise<Kvar[]> {
        const res = await axios.get<ApiEnvelope<Kvar | Kvar[]>>(`${API_URL}`, { headers: authHeader(token) });
        if (!res.data.success) throw new Error(res.data.message || "Greška pri učitavanju kvarova.");
        return normalizeToArray(res.data.data);
    },
    getKvarByStatus: async function (token: string, status: string): Promise<Kvar[]> {
        const url = `${API_URL}/status/${encodeURIComponent(status)}`;
        const res = await axios.get<ApiEnvelope<Kvar | Kvar[]>>(url, { headers: authHeader(token) });
        if (!res.data.success) throw new Error(res.data.message || "Greška pri filtriranju kvarova.");
        return normalizeToArray(res.data.data);
    },
    createKvar: async function (token: string, kvar: Partial<Kvar>): Promise<Kvar> {
        const res = await axios.post<ApiEnvelope<Kvar>>(
            `${API_URL}`,
            kvar,
            { headers: { ...authHeader(token), "Content-Type": "application/json" } }
        );
        if (!res.data.success || !res.data.data) {
            throw new Error(res.data.message || "Greška pri kreiranju kvara.");
        }
        return res.data.data;
    },
    updateKvarStatus: async function (token: string, id: number, status: string): Promise<Kvar> {
        const res = await axios.put<ApiEnvelope<Kvar>>(
            `${API_URL}/${id}/status`,
            { status },
            { headers: { ...authHeader(token), "Content-Type": "application/json" } }
        );
        if (!res.data.success || !res.data.data) {
            throw new Error(res.data.message || "Greška pri izmeni statusa.");
        }
        return res.data.data;
    },
    resolveKvar: async function (token: string, id: number, payload: { status: string; comment: string; price: number; }): Promise<Kvar> {
        const res = await axios.put<ApiEnvelope<Kvar>>(
            `${API_URL}/${id}/resolve`,
            payload,
            { headers: { ...authHeader(token), "Content-Type": "application/json" } }
        );
        if (!res.data.success || !res.data.data) {
            throw new Error(res.data.message || "Greška pri zaključivanju kvara.");
        }
        return res.data.data;
    }
}