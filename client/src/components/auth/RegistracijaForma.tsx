import { useState } from "react";
import { Link } from "react-router-dom";
import { validacijaPodatakaAuth } from "../../api_services/validators/auth/AuthValidator";
import type { AuthFormProps } from "../../types/props/auth_form_props/AuthFormProps";
import { useAuth } from "../../hooks/auth/useAuthHook";

export function RegistracijaForma({ authApi }: AuthFormProps) {
  const [korisnickoIme, setKorisnickoIme] = useState("");
  const [lozinka, setLozinka] = useState("");
  const [uloga, setUloga] = useState("user");
  const [ime, setIme] = useState("");
  const [prezime, setPrezime] = useState("");
  const [godine, setGodine] = useState(0);

  const [greska, setGreska] = useState("");
  const { login } = useAuth();

  const podnesiFormu = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!ime.trim()) {
      setGreska("Ime je obavezno.");
      return;
    }

    if (!prezime.trim()) {
      setGreska("Ime je obavezno.");
      return;
    }



    const validacija = validacijaPodatakaAuth(korisnickoIme, lozinka);
    if (!validacija.uspesno) {
      setGreska(validacija.poruka ?? "Neispravni podaci");
      return;
    }

    const odgovor = await authApi.registracija(korisnickoIme, lozinka, uloga, ime, prezime, godine);
    if (odgovor.success && odgovor.data) {
      login(odgovor.data);
    } else {
      setGreska(odgovor.message);
      setKorisnickoIme("");
      setLozinka("");
      setIme("");
      setPrezime("");
      setGodine(0);
    }
  };

  return (
    <div className="bg-green-100/30 backdrop-blur-lg shadow-xl rounded-2xl p-10 w-full max-w-md border border-white/20">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Registracija
      </h1>
      <form onSubmit={podnesiFormu} className="space-y-4">
        <input
          type="text"
          placeholder="Ime"
          value={ime}
          onChange={(e) => setIme(e.target.value)}
          className="w-full bg-green-200/40 px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="text"
          placeholder="Prezime"
          value={prezime}
          onChange={(e) => setPrezime(e.target.value)}
          className="w-full bg-green-200/40 px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="number"
          placeholder="Godine"
          value={godine}
          min={"18"}
          onChange={(e) => setGodine(Number(e.target.value))}
          onBlur={(e) => {
            const value: string = e.target.value;
            if (value.trim() === "") {
              setGodine(18);
            } else {
              const broj: number = Number(value);
              if (broj >= 18) {
                setGodine(broj);
              } else {
                alert("Morate imati više od 18 godina!");
                setGodine(18);
              }
            }
          }}
          className="w-full bg-green-200/40 px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="text"
          placeholder="Korisnicko ime"
          value={korisnickoIme}
          onChange={(e) => setKorisnickoIme(e.target.value)}
          className="w-full bg-green-200/40 px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="password"
          placeholder="Lozinka"
          value={lozinka}
          onChange={(e) => setLozinka(e.target.value)}
          className="w-full bg-green-200/40 px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <select
          value={uloga}
          onChange={(e) => setUloga(e.target.value)}
          className="w-full bg-green-200/40 px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="stanar">Stanar</option>
          <option value="majstor">Majstor</option>
        </select>
        {greska && (
          <p className="text-md text-center text-red-700/80 font-medium">
            {greska}
          </p>
        )}
        <button
          type="submit"
          className="w-full  bg-green-700/70 hover:bg-blue-700/90 text-white py-2 rounded-xl  transition"
        >
          Registruj se
        </button>
      </form>
      <p className="text-center text-sm mt-4">
        Vec imate nalog?{" "}
        <Link to="/login" className="text-blue-700 hover:underline">
          Prijavite se
        </Link>
      </p>
    </div>
  );
}
