import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/auth/useAuthHook";
import { useEffect } from "react";
import { PročitajVrednostPoKljuču } from "../../helpers/local_storage";

export default function StanarDashboard() {
    const { isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const token = PročitajVrednostPoKljuču("authToken");
        if (!isAuthenticated || !token) {
            logout();
            navigate("/login", { replace: true });
        }
    }, [isAuthenticated, logout, navigate]);

    const handleLogout = () => {
        logout();
        navigate("/login", { replace: true });
    };

    return (
        <div className="min-h-screen bg-gradient-to-tr from-yellow-200 to-yellow-400 flex flex-col">
            <div className="flex justify-end items-center p-4 gap-3">
                <button className="px-4 py-2 bg-white/80 rounded-lg shadow hover:bg-white">
                    Informacije o stanaru
                </button>
                <button onClick={handleLogout} className="px-4 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600">
                    Odjavi me
                </button>
            </div>

            <div className="flex flex-1 items-center justify-center gap-6">
                <button onClick={() => navigate("/prijavi-kvar")} className="px-8 py-6 text-lg bg-white rounded-2xl shadow-lg hover:bg-gray-100">
                    Prijavi kvar
                </button>
                <button onClick={() => navigate("/lista-kvarova")} className="px-8 py-6 text-lg bg-white rounded-2xl shadow-lg hover:bg-gray-100">
                    Lista kvarova
                </button>
            </div>
        </div>
    );


}