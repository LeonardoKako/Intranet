// App.tsx
import { BrowserRouter, Route, Routes } from "react-router";
import Home from "./pages/Home";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import InDevelopment from "./pages/InDevelopment";
import Login from "./pages/Login";
import Access from "./pages/Access";

// Categorias disponíveis no sistema
const CATEGORIES = [
  "usuarios",
  "servidores",
  "cloud",
  "rede",
  "seguranca",
  "documentacao",
];

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rota pública - Página de autenticação */}
        <Route path='/' element={<Login />} />

        {/* Rotas protegidas com Layout */}
        <Route
          path='/home'
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        {/* Rota específica para Login (Lista de logins/senhas) */}
        <Route
          path='/category/acessos'
          element={
            <ProtectedRoute>
              <Access />
            </ProtectedRoute>
          }
        />

        {/* Rota específica para Settings */}
        <Route
          path='/settings'
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }
        />

        {/* Rotas dinâmicas para todas as categorias */}
        {CATEGORIES.map((category) => (
          <Route
            key={category}
            path={`/category/${category}`}
            element={
              <ProtectedRoute>
                <InDevelopment />
              </ProtectedRoute>
            }
          />
        ))}

        {/* Rota 404 personalizada */}
        <Route
          path='/*'
          element={
            <ProtectedRoute>
              <NotFound />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
