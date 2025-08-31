import { ResultSetHeader, RowDataPacket } from "mysql2";
import { Kvar } from "../../../Domain/models/Kvar";
import { IKvaroviRepository } from "../../../Domain/repositories/kvarovi/IKvaroviRepository";
import db from "../../connection/DbConnectionPool";
import { reakcijeNaKomentar } from "../../../Domain/enums/reakcijaNaKomentar";

export class KvaroviRepository implements IKvaroviRepository {
  async create(kvar: Kvar): Promise<Kvar> {
    try {
      const query = `
        INSERT INTO kvarovi (korisnikovId, naziv, opis, imageUrl, stan)
        VALUES (?, ?, ?, ?, ?)
      `;
      const [result] = await db.execute<ResultSetHeader>(query, [
        kvar.korisnikovId,
        kvar.naziv,
        kvar.opis,
        kvar.imageUrl,
        kvar.stanBr,
      ]);

      if (result.insertId) {
        return new Kvar(
          result.insertId,
          kvar.korisnikovId,
          kvar.naziv,
          kvar.opis,
          kvar.imageUrl,
          kvar.stanBr,
        );
      }

      return new Kvar();
    } catch (error) {
      console.error("Error creating kvar:", error);
      return new Kvar();
    }
  }

  async getById(id: number): Promise<Kvar> {
    try {
      const query = `SELECT * FROM kvarovi WHERE id = ?`;
      const [rows] = await db.execute<RowDataPacket[]>(query, [id]);

      if (rows.length > 0) {
        const r = rows[0];
        return new Kvar(
          r.id,
          r.korisnikovId,
          r.naziv,
          r.opis,
          r.imageUrl,
          r.stanBr,
          r.status,
          r.datum,
          r.cena,
          r.komentar,
          r.reakcija
        );
      }

      return new Kvar();
    } catch (error) {
      console.error("Error getting kvar by id:", error);
      return new Kvar();
    }
  }

  async getByUser(userId: number, status?: string | null, sortBy?: 'createdAt' | 'cena', order: 'ASC' | 'DESC' = 'DESC'): Promise<Kvar[]> {
    try {
      let query = `SELECT * FROM kvarovi WHERE userId = ?`;
      const params: any[] = [userId];

      if (status) {
        query += ` AND status = ?`;
        params.push(status);
      }

      if (sortBy) {
        query += ` ORDER BY ${sortBy} ${order}`;
      } else {
        query += ` ORDER BY createdAt ${order}`;
      }

      const [rows] = await db.execute<RowDataPacket[]>(query, params);
      return rows.map((r: any) => new Kvar(
        r.id, r.korisnikovId, r.naziv, r.opis, r.imageUrl, r.stanBr, r.datum, r.status, r.cena, r.komentar, r.reakcija
      ));
    } catch (error) {
      console.error("Error getting kvar by user:", error);
      return [];
    }
  }

  async getAll(status?: string | null, sortBy?: 'createdAt' | 'cena', order: 'ASC' | 'DESC' = 'DESC'): Promise<Kvar[]> {
    try {
      let query = `SELECT * FROM kvarovi WHERE 1=1`;
      const params: any[] = [];

      if (status) {
        query += ` AND status = ?`;
        params.push(status);
      }

      if (sortBy) {
        query += ` ORDER BY ${sortBy} ${order}`;
      } else {
        query += ` ORDER BY createdAt ${order}`;
      }

      const [rows] = await db.execute<RowDataPacket[]>(query, params);
      return rows.map((r: any) => new Kvar(
        r.id, r.korisnikovId, r.naziv, r.opis, r.imageUrl, r.stanBr, r.datum, r.status, r.cena, r.komentar, r.reakcija
      ));
    } catch (error) {
      console.error("Error getting kvarove:", error);
      return [];
    }
  }

  async update(kvar: Kvar): Promise<Kvar> {
    try {
      const query = `
        UPDATE kvarovi
        SET naziv = ?, opis = ?, imageUrl = ?, stanBr = ?, status = ?, cena = ?, komentar = ?, reakcija = ?
        WHERE id = ?
      `;
      const [result] = await db.execute<ResultSetHeader>(query, [
        kvar.id,
        kvar.naziv,
        kvar.opis,
        kvar.imageUrl,
        kvar.stanBr,
        kvar.status,
        kvar.cena,
        kvar.datum,
        kvar.komentar,
        kvar.reakcija 
      ]);

      if (result.affectedRows > 0) {
        return kvar;
      }

      return new Kvar();
    } catch (error) {
      console.error("Error updating kvar:", error);
      return new Kvar();
    }
  }

  async delete(id: number): Promise<boolean> {
    try {
      const query = `DELETE FROM kvarovi WHERE id = ?`;
      const [result] = await db.execute<ResultSetHeader>(query, [id]);
      return result.affectedRows > 0;
    } catch (error) {
      console.error("Error deleting kvar:", error);
      return false;
    }
  }

  async exists(id: number): Promise<boolean> {
    try {
      const query = `SELECT COUNT(*) as count FROM kvarovi WHERE id = ?`;
      const [rows] = await db.execute<RowDataPacket[]>(query, [id]);
      return rows[0].count > 0;
    } catch (error) {
      console.error("Error checking kvar exists:", error);
      return false;
    }
  }

  public async addReaction(komentar: string, reakcija: reakcijeNaKomentar ,kvar : Kvar): Promise<boolean> {
   try {
   
    const now = new Date().toISOString().slice(0, 19).replace("T", " ");
    const query = `
        UPDATE kvarovi
        SET  komentar = ?, reakcija = ?
        WHERE id = ?
    `;

    const [result]=await db.execute<ResultSetHeader>(query, [
      komentar,
      reakcija,
      kvar.id
    ]);
    return result.affectedRows > 0;

  } catch (err) {
    console.error("Error reakcije na komentar:", err);
      return false;
  }
  }
}