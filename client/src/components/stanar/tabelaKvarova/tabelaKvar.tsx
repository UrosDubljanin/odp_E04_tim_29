import { useEffect, useMemo, useState } from "react";
import type { IKvarAPIService } from "../../../api_services/kvarovi/IKvarAPIService";
import { ObrišiVrednostPoKljuču } from "../../../helpers/local_storage";
import { useAuth } from "../../../hooks/auth/useAuthHook";
import type { Kvar } from "../../../models/kvar/Kvar";
import { DodajKvar } from "../dodajKvar/dodajKvar";
import type { KvaroviStatus } from "../../../models/kvar/KvaroviStatus";
import { RedKvar } from "./redKvar";

interface TabelaKvarProps {
    kvarApi: IKvarAPIService;
}
type StatusFilter = KvaroviStatus | "svi";
type SortKey = "noviji" | "stariji" | "visa" | "niza";


export function TabelaKvar({ kvarApi }: TabelaKvarProps) {
    const { token, user, logout } = useAuth();
    const [kvarovi, setKvarovi] = useState<Kvar[]>([]);
    const [loading, setLoading] = useState(true);
    const [statusFilter, setStatusFilter] = useState<StatusFilter>("svi");
    const [sortKey, setSortKey] = useState<SortKey>("noviji");
    const [showForm, setShowForm] = useState(false);

    const handleLogout = () => {
        ObrišiVrednostPoKljuču("authToken");
        logout();
    };

    const loadMyFaults = async () => {
        if (!token || !user?.id) return;
        setLoading(true);
        try {
            const data = await kvarApi.getMojeKvarove(token, user.id);
            setKvarovi(data);
        } catch (e) {
            console.error("Greška pri učitavanju kvarova:", e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadMyFaults();
    }, [token, user?.id, kvarApi]);

    const onLike = (id: number) => {
        console.log("Like kliknut za kvar ID:", id);
    };

    const toDate = (v?: string | Date) => {
        if (!v) return 0;
        const d = typeof v === "string" ? new Date(v) : v;
        return isNaN(d.getTime()) ? 0 : d.getTime();
    };

    const toPrice = (v?: number | null) => (typeof v === "number" ? v : -Infinity);

    const prikazani = useMemo(() => {
        const filtered =
            statusFilter === "svi"
                ? kvarovi
                : kvarovi.filter((k) => k.status === statusFilter);

        const sorted = [...filtered].sort((a, b) => {
            switch (sortKey) {
                case "noviji":
                    return toDate(b.datum) - toDate(a.datum);
                case "stariji":
                    return toDate(a.datum) - toDate(b.datum);
                case "visa":
                    return toPrice(b.cena) - toPrice(a.cena);
                case "niza":
                    return toPrice(a.cena) - toPrice(b.cena);
                default:
                    return 0;
            }
        });
        return sorted;
    }, [kvarovi, statusFilter, sortKey]);

    const openForm = () => setShowForm(true);
    const closeForm = () => setShowForm(false);

    const handleCreated = async (_created: Kvar) => {
        await loadMyFaults();
        setShowForm(false);
    };

    return (
        <div className="faults">
            {showForm && token && user?.id && (
                <DodajKvar
                    kvarApi={kvarApi}
                    token={token}
                    korisnikovId={user.id}
                    onCreated={handleCreated}
                    onCancel={closeForm}
                />
            )}
            <div className="toolbar">
                <h2 className="title">Moji kvarovi</h2>

                <div className="filters">

                    <span className="label">Status:</span>
                    <select
                        className="select"
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value as StatusFilter)}
                    >
                        <option value="svi">Svi</option>
                        <option value="Kreiran">Kreiran</option>
                        <option value="Popravka u toku">Popravka u toku</option>
                        <option value="Saniran">Saniran</option>
                        <option value="Problem nije rešen">Problem nije rešen</option>
                    </select>

                    <span className="label" style={{ marginLeft: 12 }}>Sortiraj po:</span>
                    <select
                        className="select"
                        value={sortKey}
                        onChange={(e) => setSortKey(e.target.value as SortKey)}
                    >
                        <option value="datum-noviji">Datumu (noviji prvo)</option>
                        <option value="datum-stariji">Datumu (stariji prvo)</option>
                        <option value="cena-visa">Ceni (više prvo)</option>
                        <option value="cena-niza">Ceni (niže prvo)</option>
                    </select>

                    <button className="btn btn--primary" onClick={openForm} style={{ marginLeft: 12 }}>
                        + Prijavi kvar
                    </button>
                </div>
            </div>

            {loading ? (
                <div className="state info">Učitavam…</div>
            ) : (
                <div className="table-wrap">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Naziv</th>
                                <th>Opis</th>
                                <th>Status</th>
                                <th>Slika</th>
                                <th>Datum prijave</th>
                                <th>Cena</th>
                                <th>Komentar</th>
                                <th>Reakcija</th>
                            </tr>
                        </thead>
                        <tbody>
                            {prikazani.length > 0 ? (
                                prikazani.map((k) => (
                                    <RedKvar key={k.id} kvar={k} onLike={onLike} />
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={7} className="state empty">Nema kvarova za prikaz.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}

            <div className="actions" style={{ marginTop: "16px" }}>
                <button onClick={handleLogout} className="btn btn--danger">
                    Odjavi se
                </button>
            </div>


        </div>
    );
}