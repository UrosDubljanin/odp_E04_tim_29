import type { Kvar } from "../../../models/kvar/Kvar";

interface RedKvarProps {
    kvar: Kvar;
    onLike: (id: number) => void;
}

function formatDate(v?: string | Date) {
    if (!v) return "—";
    const d = typeof v === "string" ? new Date(v) : v;
    return isNaN(d.getTime()) ? "—" : d.toLocaleString("sr-RS");
}

export function RedKvar({ kvar, onLike }: RedKvarProps) {
    const hasComment = Boolean(kvar.komentar);
    //const badgeCls = `badge badge--${STATUS_CLASS[kvar.status as FaultStatus]}`;
    return (
        <tr>
            <td>{kvar.naziv}</td>
            <td className="col-desc">{kvar.opis}</td>
            <td>
                <span className="{badgeCls}">{kvar.status}</span>
            </td>
            <td className="col-img">
                <img
                    src={`/slikeKvarova/${kvar.imageUrl || "nemaSlike.jpg"}`}
                    alt=""
                    width={40}
                    height={40}
                    style={{ objectFit: "cover", borderRadius: 6, display: "block" }}
                />
            </td>
            <td>{formatDate(kvar.datum)}</td>
            <td>
                {typeof kvar.cena === "number"
                    ? Intl.NumberFormat("sr-RS", { style: "currency", currency: "RSD", maximumFractionDigits: 0 }).format(kvar.cena)
                    : "—"}
            </td>
            <td className="col-desc">{kvar.komentar ?? "—"}</td>
            <td>
                <div className="actions">
                    <button
                        className="btn btn--primary"
                        onClick={() => onLike(kvar.id)}
                        disabled={!hasComment}
                        title={hasComment ? "Sviđa mi se komentar" : "Nema komentara"}
                    >
                        Like
                    </button>
                </div>
            </td>
        </tr>
    );
}