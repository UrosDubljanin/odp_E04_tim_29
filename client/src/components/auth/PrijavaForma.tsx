import { useState } from "react";
import { Link } from "react-router-dom";
import { validacijaPodatakaAuth } from "../../api_services/validators/auth/AuthValidator";
import type { AuthFormProps } from "../../types/props/auth_form_props/AuthFormProps";
import { useAuth } from "../../hooks/auth/useAuthHook";

export function PrijavaForma({ authApi }: AuthFormProps) {
  const [korisnickoIme, setKorisnickoIme] = useState("");
  const [lozinka, setLozinka] = useState("");
  const [greska, setGreska] = useState("");
  const { login } = useAuth();

  const podnesiFormu = async (e: React.FormEvent) => {
    e.preventDefault();

    const validacija = validacijaPodatakaAuth(korisnickoIme, lozinka);
    if (!validacija.uspesno) {
      setGreska(validacija.poruka ?? "Neispravni podaci");
      return;
    }

    const odgovor = await authApi.prijava(korisnickoIme, lozinka);
    if (odgovor.success && odgovor.data) {
      login(odgovor.data);
    } else {
      setGreska(odgovor.message);
      setKorisnickoIme("");
      setLozinka("");
    }
  };

  return (
    <div className="w-full max-w-md p-10 bg-white/40 backdrop-blur-lg rounded-2xl shadow-lg border border-green-300 flex flex-col items-center space-y-6">
      <h1 className="text-3xl font-bold text-green-700/80">Prijava na Kvaromat</h1>
      <form onSubmit={podnesiFormu} className="w-full space-y-4">
        <input
          type="text"
          placeholder="Korisničko ime"
          value={korisnickoIme}
          onChange={(e) => setKorisnickoIme(e.target.value)}
          className="w-full px-4 py-2 rounded-xl border border-green-200 bg-white/60 focus:outline-none focus:ring-2 focus:ring-green-400"
        />
        <input
          type="password"
          placeholder="Lozinka"
          value={lozinka}
          onChange={(e) => setLozinka(e.target.value)}
          className="w-full px-4 py-2 rounded-xl border border-green-200 bg-white/60 focus:outline-none focus:ring-2 focus:ring-green-400"
        />
        {greska && <p className="text-red-700/80 text-center font-medium">{greska}</p>}
        <button
          type="submit"
          className="w-full py-2 rounded-xl bg-gradient-to-r from-emerald-400 to-green-600 text-white font-semibold shadow hover:brightness-105 transition"
        >
          Prijavi se
        </button>
      </form>
      <p className="text-sm text-center text-green-700/80">
        Nemate nalog?{" "}
        <Link to="/register" className="text-green-800 font-medium hover:underline">
          Registrujte se
        </Link>
      </p>
    </div>
  );
}
