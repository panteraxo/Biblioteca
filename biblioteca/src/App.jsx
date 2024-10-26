import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Autor from "./pages/mantenimiento/autor/Autor";
import Category from "./pages/mantenimiento/category/Category";
import Dashboard from "./pages/dashboard/Dashboard";
import Login from "./pages/Login/Login";
import Register from "./pages/Login/Register";
import Prestamos from "./pages/prestamos/Prestamos";

import Library from "./pages/mantenimiento/library/Library";
import Editorial from "./pages/mantenimiento/editorial/Editorial";
import RootLayout from "./components/RootLayout";
import Estudiante from "./pages/usuarios/estudiante/Estudiante";

export default function App() {
  const isLoggedIn = window.localStorage.getItem("loggedIn");
  const userType = window.localStorage.getItem("userType");
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route element={<RootLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />

            <Route path="/prestamos" element={<Prestamos />} />

            <Route path="/mantenimiento">
              <Route path="library" element={<Library />} />
              <Route path="category" element={<Category />} />
              <Route path="autor" element={<Autor />} />
              <Route path="editorial" element={<Editorial />} />
            </Route>
            <Route path="/usuarios">
              <Route path="estudiante" element={<Estudiante />} />
            </Route>
          </Route>
        </Routes>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </Router>
  );
}
