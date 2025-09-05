import type { IReactionAPIService } from "./IReactionAPIService";
import type { ApiResponse } from "../../types/API/ApiResponse";
import type { ReactionType } from "../../types/reactions/ReactionType";
import axios from "axios";
import { PročitajVrednostPoKljuču } from "../../helpers/local_storage";

const RAW_API = import.meta.env.VITE_API_URL ?? "http://localhost:4000/api/v1";
const API_BASE = RAW_API.endsWith("/") ? RAW_API : RAW_API + "/";

export const reactionApi: IReactionAPIService = {
  async dodajReakciju(id: number, tip: Exclude<ReactionType, null>): Promise<ApiResponse<null>> {
    try {
      const token = PročitajVrednostPoKljuču("authToken");
      const res = await axios.post<ApiResponse<null>>(`${API_BASE}reports/${id}/reaction`, { tip }, {
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      });
      return res.data;
    } catch (error) {
      let message = "Greska pri slanju reakcije.";
      if (axios.isAxiosError(error)) {
        message = error.response?.data?.message || message;
      }
      return { success: false, message };
    }
  },

  async getReakcija(id: number): Promise<ApiResponse<{ tip: ReactionType | null }>> {
    try {
      const token = PročitajVrednostPoKljuču("authToken");
      const res = await axios.get<ApiResponse<{ tip: ReactionType | null }>>(`${API_BASE}reports/${id}/reaction`, {
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      });
      return res.data;
    } catch (error) {
      let message = "Greska pri preuzimanju reakcije.";
      if (axios.isAxiosError(error)) {
        message = error.response?.data?.message || message;
      }
      return { success: false, message, data: { tip: null } };
    }
  },


};
