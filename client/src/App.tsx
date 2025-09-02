import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { authApi } from "./api_services/auth/AuthAPIService";
import { ProtectedRoute } from "./components/protected_route/ProtectedRoute";
import PrijavaStranica from "./pages/auth/PrijavaStranica";
import RegistracijaStranica from "./pages/auth/RegistracijaStranica";
import KontrolnaTablaAdminStranica from "./pages/kontrolna_tabla/KontrolnaTablaAdminStranica";
import NotFoundStranica from "./pages/not_found/NotFoundPage";


//stanarove stranice
import StanarDashboard from "./pages/stanar/StanarDashboard";

import DodajKvarPage from "./pages/stanar/DodajKvarPage";
import ListaKvarovaPage from "./pages/stanar/ListaKvarovaPage";


import { usersApi } from "./api_services/users/UsersAPIService";

import { KvarApi } from "./api_services/kvarovi/KvarAPIService";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<PrijavaStranica authApi={authApi} />} />
      <Route path="/register" element={<RegistracijaStranica authApi={authApi} />} />
      <Route path="/404" element={<NotFoundStranica />} />

        <Route path="/stanar-dashboard" element={
        <ProtectedRoute requiredRole="stanar">
          <StanarDashboard/>
        </ProtectedRoute>} />

        <Route
          path="/majstor-dashboard"
          element={
            <ProtectedRoute requiredRole="majstor">
              <KontrolnaTablaAdminStranica usersApi={usersApi} /> 
            </ProtectedRoute>
          }
        />

        <Route
        path="/lista-kvarova"
        element={
          <ProtectedRoute requiredRole="stanar">
            <ListaKvarovaPage kvarApi={KvarApi} />
          </ProtectedRoute>
        }
      />


        <Route
          path="/prijavi-kvar"
          element={
            <ProtectedRoute requiredRole="stanar">
              <DodajKvarPage kvarApi={KvarApi} />
            </ProtectedRoute>
          }
        />



        {/* Preusmerava na dashboard kao default rutu */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Catch-all ruta za nepostojeće stranice */}
        <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  );
}

export default App;
