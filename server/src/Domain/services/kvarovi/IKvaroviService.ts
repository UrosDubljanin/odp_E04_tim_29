import { KvarDto } from "../../DTOs/kvar/KvarDto";

export interface IKvaroviService {
  getSviKvarovi(
    status?: string | null,
    sortBy?: "createdAt" | "cena",
    order?: "ASC" | "DESC"
  ): Promise<KvarDto[]>;

  getKvaroveKorisnika(
    userId: number,
    status?: string | null,
    sortBy?: "createdAt" | "cena",
    order?: "ASC" | "DESC"
  ): Promise<KvarDto[]>;

  kreirajKvar(data: {
    userId: number;
    naslov?: string | null;
    opis: string;
    imagePath?: string | null;
    adresa: string;
  }): Promise<KvarDto>;

  prihvatiKvar(
    reportId: number,
    masterId: number
  ): Promise<boolean>;

  zavrsiKvar(
    reportId: number,
    masterId: number,
    saniran: boolean,
    comment?: string,
    cena?: number
  ): Promise<boolean>;
}