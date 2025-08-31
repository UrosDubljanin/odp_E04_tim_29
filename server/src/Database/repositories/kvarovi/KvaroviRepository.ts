import { IKvaroviRepository } from "../../../Domain/repositories/kvarovi/IKvaroviRepository";
import { Kvar } from "../../../Domain/models/Kvar";
import { RowDataPacket, ResultSetHeader } from "mysql2";
import db from "../../connection/DbConnectionPool";
import { KvarDto } from "../../../Domain/DTOs/kvar/KvarDto";
import { statusGreske } from "../../../Domain/enums/statusGreske";


export class KvaroviRepository implements IKvaroviRepository {
    async create(kvar: Kvar): Promise<Kvar> {
        try {
            const query = `
        INSERT INTO kvarovi (korisnikovId, commentId, naziv, opis, imageUrl, status, datum) 
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `;

            const [result] = await db.execute<ResultSetHeader>(query, [
                kvar.korisnikovId,
                kvar.komentarId,
                kvar.naziv,
                kvar.opis,
                kvar.imageUrl,
                kvar.status,
                kvar.datum, ,
            ]);


            if (result.insertId) {
                // Vraćamo novog korisnika sa dodeljenim ID-om
                return new Kvar(result.insertId,
                    kvar.korisnikovId,
                    kvar.komentarId,
                    kvar.naziv,
                    kvar.opis,
                    kvar.imageUrl,
                    kvar.status,
                    kvar.datum);
            }
            return new Kvar();
        } catch (error) {
            console.error('Error creating kvar:', error);
            return new Kvar();
        }
    }
    async getById(id: number): Promise<KvarDto> {
        try {
            const query = `
        SELECT f.*, c.comment, CAST(c.price AS DECIMAL(10,2)) AS price
        FROM kvarovi f 
        LEFT JOIN comments c ON f.commentId = c.id
        WHERE f.id = ?
      `;
            const [rows] = await db.execute<RowDataPacket[]>(query, [id]);

            if (rows.length > 0) {
                const row = rows[0];
                return new KvarDto(
                    row.id,
                    row.userId,
                    row.name,
                    row.description,
                    row.imageUrl,
                    row.status,
                    row.createdAt,
                    row.comment,
                    row.price
                );
            }
            return new KvarDto();
        } catch (error) {
            console.error("Error getting fault by ID:", error);
            return new KvarDto();
        }
    }

    getByUsername(naziv: string): Promise<Kvar> {
        throw new Error("Method not implemented.");
    }
    async getFaultsByUser(korisnikovId: number): Promise<KvarDto[]> {
        try {
            const query = `
        SELECT f.*, c.comment, CAST(c.price AS DECIMAL(10,2)) AS price
        FROM faults f
        LEFT JOIN comments c ON f.commentId = c.id
        WHERE f.userId = ?
        ORDER BY f.createdAt DESC
      `;
            const [rows] = await db.execute<RowDataPacket[]>(query, [korisnikovId]);
            return rows.map(row => new KvarDto(
                row.id,
                row.userId,
                row.name,
                row.description,
                row.imageUrl,
                row.status,
                row.createdAt,
                row.comment,
                row.price
            ));
        } catch (error) {
            console.error("Error fetching user faults:", error);
            return [];
        }
    }
    getAll(): Promise<Kvar[]> {
        throw new Error("Method not implemented.");
    }
    async update(kvar: Kvar): Promise<Kvar> {
        try {
            const query = `
        UPDATE faults 
        SET description = ?, status = ?, imageUrl = ? 
        WHERE id = ?
      `;
            const [result] = await db.execute<ResultSetHeader>(query, [
                kvar.opis,
                kvar.status,
                kvar.imageUrl,
                kvar.id
            ]);

            if (result.affectedRows > 0) {
                return kvar;
            }
            return new Kvar();
        } catch (error) {
            console.error("Greska prilikom updejtovanja kvara:", error);
            return new Kvar();
        }
    }
    delete(id: number): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    exists(id: number): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    async updateStatusKvara(Id: number, status: statusGreske): Promise<KvarDto> {
    try {
      const query = `UPDATE kvarovi SET status = ? WHERE id = ?`;
      const [result] = await db.execute<ResultSetHeader>(query, [status, Id]);

      if (result.affectedRows > 0) {
        return this.getById(Id);
      }
      return new KvarDto();
    } catch (error) {
      console.error("Error updating fault status:", error);
      return new KvarDto();
    }
  }

}
