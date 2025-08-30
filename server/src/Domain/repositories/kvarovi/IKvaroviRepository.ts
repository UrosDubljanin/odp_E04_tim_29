import { Kvar } from "../../models/Kvar";


export interface IKvaroviRepository {
  
  create(user: Kvar): Promise<Kvar>;

  
  getById(id: number): Promise<Kvar>;

  
  getByUsername(naziv: string): Promise<Kvar>;

  getFaultsByUser(korisnickovId: number): Promise<Kvar[]>;
  
  getAll(): Promise<Kvar[]>;

  
  update(user: Kvar): Promise<Kvar>;

  
  delete(id: number): Promise<boolean>;

  
  exists(id: number): Promise<boolean>;
}