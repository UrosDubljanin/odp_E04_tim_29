import { jwtDecode } from "jwt-decode";
import { ObrišiVrednostPoKljuču, PročitajVrednostPoKljuču } from "../../helpers/local_storage";
import { useAuth } from "../../hooks/auth/useAuthHook";
import type { IUsersAPIService } from "../../api_services/users/IUsersAPIService";
import type { JwtTokenClaims } from "../../types/auth/JwtTokenClaims";
import { useNavigate } from "react-router-dom";

interface Props {
  usersApi: IUsersAPIService;
}



export async function InformacijeOKorisniku({ usersApi }: Props) {
  const token = PročitajVrednostPoKljuču("authToken");
  const { logout } = useAuth();
 const navigate=useNavigate();

  if (!token) return null;

  const { id, korisnickoIme, uloga } = jwtDecode<JwtTokenClaims>(token);
  const useri=await usersApi.getSviKorisnici(token)

  const {imePrezime,datum}=useri[id];

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="bg-white/30 backdrop-blur-lg shadow-md rounded-2xl p-10 w-full max-w-2xl border border-gray-300">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Informacije o korisniku</h1>

      <div className="space-y-3 text-lg text-gray-800">
        <p><strong>ID:</strong> {id}</p>
        <p><strong>Ime i prezime:</strong> {imePrezime}</p>
        <p><strong>Datum rodjenja:</strong> {datum}</p>
        <p><strong>Korisnicko ime:</strong> {korisnickoIme}</p>
        <p><strong>Uloga:</strong> {uloga}</p>
      </div>

      <button
        onClick={handleGoBack}
        className="mt-8 px-4 bg-red-700/60 hover:bg-red-700/70 text-white py-2 rounded-xl  transition"
      >
        Vrati na stranicu
      </button>
    </div>
  );
}