import type { Kvar } from "../../models/kvar/Kvar";

export interface IKvarAPIService {
  getMojeKvarove(token: string, userId: number): Promise<Kvar[]>;
  getAllKvar(token: string): Promise<Kvar[]>;
  getKvarByStatus(token: string, status: string): Promise<Kvar[]>;
  createKvar(token: string, kvar: Partial<Kvar>): Promise<Kvar>;
  updateKvarStatus(token: string, id: number, status: string): Promise<Kvar>;
  resolveKvar(token: string, id: number, payload: { status: string; comment: string; price: number }): Promise<Kvar>;
}