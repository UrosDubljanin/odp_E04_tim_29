import { KvarDto } from "../../Domain/DTOs/kvar/KvarDto";
import { Kvar } from "../../Domain/models/Kvar";
import { IKvaroviRepository } from "../../Domain/repositories/kvarovi/IKvaroviRepository";
import { IKvaroviService } from "../../Domain/services/kvarovi/IKvaroviService";
import { validacijaPrijaveKvara } from "../../WebAPI/validators/kvarovi/ReportValidator";

export class KvaroviService implements IKvaroviService {
    constructor(private repo: IKvaroviRepository) {
    }
    async getSviKvarovi(status?: string | null, sortBy?: "createdAt" | "cena", order?: "ASC" | "DESC"): Promise<KvarDto[]> {
        const kvarovi: KvarDto[] = await this.repo.getAll(status, sortBy, order);
        return kvarovi.map(r => new KvarDto(
            r.id, r.korisnikovId, r.naziv, r.opis, r.imageUrl, r.stanBr, r.status, r.datum, r.cena, r.komentar, r.reakcija
        ));
    }
    async getKvaroveKorisnika(userId: number, status?: string | null, sortBy?: "createdAt" | "cena", order?: "ASC" | "DESC"): Promise<KvarDto[]> {
        const reports = await this.repo.getByUser(userId, status, sortBy, order);
        return reports.map(r => new KvarDto(
            r.id, r.korisnikovId, r.naziv, r.opis, r.imageUrl, r.stanBr, r.status, r.datum, r.cena, r.komentar, r.reakcija
        ));
    }
    async kreirajKvar(data: { userId: number; naslov?: string | null; opis: string; imagePath?: string | null; adresa: string; }): Promise<KvarDto> {
        const rezultat = validacijaPrijaveKvara(
            data.naslov ?? undefined,
            data.opis,
            data.adresa
        );

        if (!rezultat.uspesno) {
            throw new Error(rezultat.poruka || "Validacija nije prošla.");
        }

        const r = new Kvar(
            0,
            data.userId,
            data.naslov ?? "",
            data.opis,
            data.imagePath ?? null,
            data.adresa
        );

        return await this.repo.create(r);
    }
    async prihvatiKvar(reportId: number, masterId: number): Promise<boolean> {
        const exists = await this.repo.exists(reportId);
        if (!exists) throw new Error("Prijava nije pronađena.");
        const kvar = await this.repo.getById(reportId);
        kvar.status = "Popravka u toku";
        const updated = await this.repo.update(kvar);
        return updated.id !== 0;
    }
    async zavrsiKvar(reportId: number, masterId: number, saniran: boolean, comment?: string, cena?: number): Promise<boolean> {
        const exists = await this.repo.exists(reportId);
        if (!exists) throw new Error("Prijava nije pronađena.");

        const report = await this.repo.getById(reportId);

        report.komentar = comment ?? null;
        report.cena = cena ?? null;
        report.status = saniran ? "Saniran" : "Problem nije rešen";

        const updated = await this.repo.update(report);
        return updated.id !== 0;
    }

}