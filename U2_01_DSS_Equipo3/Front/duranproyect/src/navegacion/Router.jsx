import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../sesion/Login";
import Error403 from "../paginaserror/Error403";
import Error404 from "../paginaserror/Error404";
import Principal from "../usuario/Principal";
import VerUsuario from "../usuario/VerUsuario";
import VerBitacora from "../usuario/VerBitacora";
import ProtectedRoute from "../navegacion/ProtectedRoute"; 

function AppRouter() {
  return (
    <Router>
      <Routes>
        {/* Ruta pública */}
        <Route path="/" element={<Login />} />

        {/* Rutas protegidas */}
        <Route element={<ProtectedRoute />}>
          <Route path="/principal" element={<Principal />}>
            <Route index element={<VerUsuario />} />
            <Route path="usuarios" element={<VerUsuario />} />
            <Route path="bitacora" element={<VerBitacora />} />
          </Route>
        </Route>

        {/* Rutas de error */}
        <Route path="/403" element={<Error403 />} />
        <Route path="/404" element={<Error404 />} />

        {/* Ruta no encontrada (404) */}
        <Route path="*" element={<Error404 />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;