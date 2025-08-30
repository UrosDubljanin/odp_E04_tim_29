import { IKvaroviRepository } from "../../../Domain/repositories/kvarovi/IKvaroviRepository";
import { Kvar } from "../../../Domain/models/Kvar";
import { RowDataPacket, ResultSetHeader } from "mysql2";
import db from "../../connection/DbConnectionPool";


export class KvaroviRepository implements IKvaroviRepository {
    create(user: Kvar): Promise<Kvar> {
        throw new Error("Method not implemented.");
    }
    getById(id: number): Promise<Kvar> {
        throw new Error("Method not implemented.");
    }
    getByUsername(naziv: string): Promise<Kvar> {
        throw new Error("Method not implemented.");
    }
    getFaultsByUser(korisnikovId: number): Promise<Kvar[]> {
        throw new Error("Method not implemented.");
    }
    getAll(): Promise<Kvar[]> {
        throw new Error("Method not implemented.");
    }
    update(user: Kvar): Promise<Kvar> {
        throw new Error("Method not implemented.");
    }
    delete(id: number): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    exists(id: number): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

}
