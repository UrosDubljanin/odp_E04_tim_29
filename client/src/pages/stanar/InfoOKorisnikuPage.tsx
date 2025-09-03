import { useNavigate } from "react-router-dom";
import type { IUsersAPIService } from "../../api_services/users/IUsersAPIService";
import { useAuth } from "../../hooks/auth/useAuthHook";
import { useEffect } from "react";
import { PročitajVrednostPoKljuču } from "../../helpers/local_storage";
import { InformacijeOKorisniku } from "../../components/auth/InfoOKorisniku";

interface KontrolnaTablaAdminStranicaProps {
  usersApi: IUsersAPIService;
}

export default function KontrolnaTablaAdminStranica({ usersApi }: KontrolnaTablaAdminStranicaProps) {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const token = PročitajVrednostPoKljuču("authToken");

    if (!isAuthenticated || !token) {
      logout();
      navigate("/login");
    }
  }, [isAuthenticated, logout, navigate]);

  return (
    <main className="min-h-screen bg-gradient-to-tr from-slate-600/75 to-orange-800/70 flex items-center justify-center">
      <InformacijeOKorisniku usersApi={usersApi} />
    </main>
  );
}