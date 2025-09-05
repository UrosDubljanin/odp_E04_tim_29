import { Outlet } from "react-router-dom";
import { useLogout } from "../../hooks/other/useLogoutHook";
import { LogOut, Drill } from "lucide-react";

export default function MajstorDashboard() {
  const logout = useLogout();

  return (
    <main className="page-wrapper text-center px-4 flex flex-col min-h-screen bg-green-50">
      {/* Header sa odjavom */}
      <header className="flex justify-end py-4">
        <button
          onClick={logout}
          className="bg-green-500 text-white inline-flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-green-600 transition-shadow shadow-md"
        >
          <LogOut size={18} />
          Odjavi se
        </button>
      </header>

      {/* Naslov */}
      <h1 className="text-3xl md:text-4xl font-serif font-bold text-green-900 mb-6 text-center drop-shadow-md mt-4">
        <Drill
          size={36}
          className="inline-block text-green-700 mr-2 align-middle"
          aria-hidden
        />
        Vaša kontrolna tabla je spremna – pregledajte zadatke i{" "}
        <span className="text-green-600">kvarove</span>
      </h1>

      {/* Dinamički sadržaj */}
      <div className="mt-6 flex-grow">
        <Outlet />
      </div>
    </main>
  );
}

