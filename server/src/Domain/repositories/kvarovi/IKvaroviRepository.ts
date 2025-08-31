import { KvarDto } from "../../DTOs/kvar/KvarDto";
import { statusGreske } from "../../enums/statusGreske";
import { Kvar } from "../../models/Kvar";


export interface IKvaroviRepository {
  
  create(kvar: Kvar): Promise<Kvar>;

  
  getById(id: number): Promise<KvarDto>;

  
  getByUsername(naziv: string): Promise<Kvar>;

  getFaultsByUser(korisnickovId: number): Promise<KvarDto[]>;
  
  getAll(): Promise<Kvar[]>;

  
  update(kvar: Kvar): Promise<Kvar>;

  
  delete(id: number): Promise<boolean>;

  
  exists(id: number): Promise<boolean>;
  updateStatusKvara(Id: number, status: statusGreske): Promise<KvarDto>
}