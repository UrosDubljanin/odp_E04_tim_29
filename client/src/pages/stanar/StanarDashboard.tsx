import { Link, useNavigate } from "react-router-dom"; 
import { useLogout } from "../../hooks/other/useLogoutHook";
import { motion } from "framer-motion";
import { LogOut, FileText, AlertCircle } from "lucide-react";


export default function StanarDashboard() {
  const logout = useLogout();
  const navigator=useNavigate();

  return (
    <main className="page-wrapper flex flex-col min-h-screen bg-gradient-to-br from-green-50 via-green-100 to-green-200 items-center justify-center px-4">
      
      <header className="w-full flex justify-end py-4 px-6">
        <button
          onClick={() => navigator("/info")}
          className="flex items-center gap-4 bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-xl shadow-md hover:brightness-110 transition"
        >
          Informacije o korisniku
        </button>
        <button
          onClick={logout}
          className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-xl shadow-md hover:brightness-110 transition"
        >
          <LogOut size={18} />
          Odjavi se
        </button>
      </header>

      <div className="flex flex-col flex-grow items-center justify-center">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-serif font-bold text-gray-800 mb-4 text-center drop-shadow-sm"
        >
          Kvaromat
        </motion.h1>

        <div className="grid gap-6 w-full max-w-4xl">
          <motion.div
            whileHover={{ scale: 1.03 }}
            className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-lg p-6 flex flex-col items-center text-center border border-green-200"
          >
            <FileText className="text-green-600 mb-3" size={40} />
            <h2 className="text-xl font-semibold mb-2 text-gray-800">Tabela vasih kvarova</h2>
            <Link
              to="/moje-prijave"
              className="px-6 py-2 rounded-xl bg-gradient-to-r from-green-400 to-green-500 text-white font-medium shadow hover:brightness-110 transition w-full sm:w-auto"
            >
              Otvori tabelu
            </Link>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.03 }}
            className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-lg p-6 flex flex-col items-center text-center border border-green-200"
          >
            <AlertCircle className="text-green-600 mb-3" size={40} />
            <h2 className="text-xl font-semibold mb-2 text-gray-800">Prijavi kvar</h2>
            <Link
              to="/prijavi-kvar"
              className="px-6 py-2 rounded-xl bg-gradient-to-r from-green-400 to-green-500 text-white font-medium shadow hover:brightness-110 transition w-full sm:w-auto"
            >
              Prijavi kvar
            </Link>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
