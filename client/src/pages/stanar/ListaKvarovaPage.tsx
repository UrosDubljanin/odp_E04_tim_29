import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PročitajVrednostPoKljuču } from "../../helpers/local_storage";
import { useAuth } from "../../hooks/auth/useAuthHook";
import ListaKvarova from "../../components/stanar/tabelaKvarova/ListaKvarova";
import type { IKvarAPIService } from "../../api_services/kvarovi/IKvarAPIService";
import type { KvarDto } from "../../models/kvar/KvarDto";

interface Props {
  kvarApi: IKvarAPIService;
}

export default function ListaKvarovaPage({ kvarApi }: Props) {
    const token = PročitajVrednostPoKljuču("authToken");
    const navigate = useNavigate();
    const { isAuthenticated, logout } = useAuth();
    const kvarovi : KvarDto[] = []


    useEffect(() => {
        const kvarovi=kvarApi.getKvaroveKorisnika


        if (!isAuthenticated || !token) {
            logout();
            navigate("/login");
        }
    }, [isAuthenticated, logout, navigate]);

    return (
        <div className="min-h-screen bg-gradient-to-tr from-yellow-200 to-yellow-400 flex flex-col">
            {/* Gornji deo sa dugmadima */}
            <div className="flex justify-end gap-4 p-4">
                <button
                    onClick={() => navigate("/prijavi-kvar")}
                    className="px-6 py-2 bg-white rounded-xl shadow hover:bg-gray-100"
                >
                    Prijavi kvar
                </button>

                <button
                    onClick={() => navigate(-1)} 
                    className="px-6 py-2 bg-white rounded-xl shadow hover:bg-gray-100"
                >
                    Nazad
                </button>
            </div>

            {/* Glavni sadržaj */}
            <div className="flex-1 flex justify-center items-center">
                <div className="w-full max-w-4xl bg-white rounded-2xl shadow-lg p-6">
                    <h1 className="text-2xl font-bold mb-4 text-center">Lista kvarova</h1>
                    <ListaKvarova kvar={kvarovi}/>
                </div>
            </div>
        </div>
    );




}


