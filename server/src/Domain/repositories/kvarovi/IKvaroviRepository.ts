import { KvarDto } from "../../DTOs/kvar/KvarDto";
import { reakcijeNaKomentar } from "../../enums/reakcijaNaKomentar";
import { statusGreske } from "../../enums/statusGreske";
import { Kvar } from "../../models/Kvar";


export interface IKvaroviRepository {
create(kvar: Kvar): Promise<Kvar>;

  getById(id: number): Promise<Kvar>;

  getByUser(userId: number,status?: string | null,sortBy?: "createdAt" | "cena",order?: "ASC" | "DESC"): Promise<Kvar[]>;

  getAll(
    status?: string | null,
    sortBy?: "createdAt" | "cena",
    order?: "ASC" | "DESC"
  ): Promise<Kvar[]>;

  update(report: Kvar): Promise<Kvar>;

  delete(id: number): Promise<boolean>;

  exists(id: number): Promise<boolean>;

  addReaction(komentar: string, reakcija: reakcijeNaKomentar ,kvar : Kvar): Promise<boolean>;
}