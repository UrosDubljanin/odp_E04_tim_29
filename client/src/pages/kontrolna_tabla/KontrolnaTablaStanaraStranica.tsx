import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/auth/useAuthHook";
import { useEffect } from "react";
import { PročitajVrednostPoKljuču } from "../../helpers/local_storage";
import type { KontrolnaTablaStranicaProp } from "../../types/props/kvar/KontrolnaTablaStanarProp";
import { TabelaKvar } from "../../components/stanar/tabelaKvarova/tabelaKvar";


export default function KontrolnaTablaStanaraStranica({ kvarApi }: KontrolnaTablaStranicaProp) {
    const { isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const token = PročitajVrednostPoKljuču("authToken");
        if (!isAuthenticated || !token) {
            logout();
            navigate("/login", { replace: true });
        }
    }, [isAuthenticated, logout, navigate]);

    return (
        <main className="min-h-screen bg-gradient-to-tr from-amber-300 via-amber-500 to-yellow-900 flex items-center justify-centermin-h-screen bg-gradient-to-tr from-slate-600/75 to-yellow-800/70 flex items-center justify-center">
            <section className="dashboard">
                <header className="dashboard__header">
                    <h1 className="dashboard__title">Kontrolna tabla – Stanar</h1>
                    <p className="dashboard__subtitle">Pregled i prijava kvarova</p>
                </header>

                <TabelaKvar kvarApi={kvarApi} />
            </section>
        </main>
    );
}
