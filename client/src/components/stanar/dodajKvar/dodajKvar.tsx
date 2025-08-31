import { useEffect, useState } from "react";
import type { IKvarAPIService } from "../../../api_services/kvarovi/IKvarAPIService";
import type { Kvar } from "../../../models/kvar/Kvar";

type Props = {
    kvarApi: IKvarAPIService;
    token: string;
    korisnikovId: number;
    onCreated: (created: Kvar) => void;
    onCancel: () => void;
};

const SLIKE = "/slikeKvarova/_index.json";


export function DodajKvar({ kvarApi, token, korisnikovId, onCreated, onCancel }: Props) {
    const [naziv, setNaziv] = useState("");
    const [opis, setOpis] = useState("");
    const [imageUrl, setImageUrl] = useState<string>("");
    const [pickerOpen, setPickerOpen] = useState(false);
    const [imageList, setImageList] = useState<string[]>([]);
    const [imgLoading, setImgLoading] = useState(false);
    const [imgError, setImgError] = useState<string | null>(null);

    const [error, setError] = useState<string | null>(null);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        if (!pickerOpen) return;
        setImgError(null);
        setImgLoading(true);
        fetch(SLIKE)
            .then(r => {
                if (!r.ok) throw new Error("Ne mogu da učitam listu slika.");
                return r.json() as Promise<string[]>;
            })
            .then(list => setImageList(list))
            .catch(err => setImgError(err.message || "Greška pri učitavanju slika."))
            .finally(() => setImgLoading(false));
    }, [pickerOpen]);

    const submit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (!naziv.trim() || !opis.trim()) {
            setError("Naziv i opis su obavezni.");
            return;
        }

        try {
            setSubmitting(true);
            const created = await kvarApi.createKvar(token, {
                korisnikovId,
                naziv: naziv.trim(),
                opis: opis.trim(),
                imageUrl: imageUrl.trim() || undefined,
            });
            onCreated(created);
        } catch (err: any) {
            setError(err?.message || "Greška pri prijavi kvara.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="form-container">
            <h1>Prijava novog kvara</h1>
            <form onSubmit={submit}>
                <div className="input-group">
                    <input
                        type="text"
                        placeholder="Naziv kvara *"
                        value={naziv}
                        onChange={(e) => setNaziv(e.target.value)}
                    />
                </div>

                <div className="input-group">
                    <input
                        type="text"
                        placeholder="Opis kvara *"
                        value={opis}
                        onChange={(e) => setOpis(e.target.value)}
                    />
                </div>

                <div className="input-group image-field">
                    <input
                        type="text"
                        placeholder="default.jpg"
                        value={imageUrl}
                        readOnly
                    />
                    <button
                        type="button"
                        className="choose-btn"
                        onClick={() => setPickerOpen(v => !v)}
                        title="Odaberi sliku"
                        aria-label="Odaberi sliku"
                    >
                        …
                    </button>

                    {imageUrl ? <img src={`/images/${imageUrl}`} alt="" /> : null}

                    {pickerOpen && (
                        <div className="image-picker">
                            <div className="hd">
                                <button type="button" onClick={() => setPickerOpen(false)}>Zatvori</button>
                            </div>

                            {imgLoading && <div>Učitavam…</div>}
                            {imgError && <div style={{ color: "crimson" }}>{imgError}</div>}

                            {!imgLoading && !imgError && (
                                <div className="grid">
                                    {imageList.map(file => (
                                        <button
                                            key={file}
                                            type="button"
                                            className={`thumb ${imageUrl === file ? "selected" : ""}`}
                                            onClick={() => { setImageUrl(file); setPickerOpen(false); }}
                                            title={file}
                                        >
                                            <img src={`/images/${file}`} alt={file} />
                                            <span>{file}</span>
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {error && <p className="error">{error}</p>}

                <div>
                    <button type="submit" disabled={submitting}>
                        {submitting ? "Slanje…" : "Sačuvaj"}
                    </button>
                    <button type="button" className="btn btn--danger" onClick={onCancel} disabled={submitting}>
                        Otkaži
                    </button>
                </div>
            </form>
        </div>
    );
}