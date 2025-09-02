import { Link } from "react-router-dom";
import type { KvarDto } from "../../../models/kvar/KvarDto";

interface Props {
    kvar: KvarDto
}

export function RedKvara({ kvar }: Props) {
    //const navigate = useNavigate();
    //const API_URL = import.meta.env.VITE_API_URL ?? "";

    const boja =
        kvar.status === "Kreiran"
            ? "bg-grey-100"
        : kvar.status === "Saniran"
            ? "bg-green-100"
        : kvar.status === "Problem nije rešen"
            ? "bg-red-100"   
        : "bg-yellow-100";

    return (
        <div className="${boja} hover:bg-gray-50 p-4 flex flex-col gap-3">
            <div className="flex items-start justify-between gap-3">
                <div>
                    <h1 className="text">
                        {kvar.naziv || "Nema naziv"}
                    </h1>
                    <p>
                        {kvar.opis || "Nema opis"}
                    </p>
                </div>
                <div>
                    <span className="text-xs text-[color:var(--muted)]">
                        {kvar.datum ? new Date(kvar.datum).toLocaleDateString() : ""}
                    </span>
                </div>
                <div>
                    <h1>
                        {kvar.cena ? kvar.cena+" RSD" : "-"}
                    </h1>
                </div>
                <div>
                    <h1>
                    <Link to={`/404`}> 
                        Info
                    </Link>
                    </h1>
                </div>
            </div>
        </div>
    );
}