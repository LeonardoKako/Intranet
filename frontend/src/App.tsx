import { BrowserRouter, Route, Routes } from "react-router";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Settings from "./pages/Settings";
import Logon from "./pages/Logon";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Logon />} />

          <Route
            path='/home'
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path='/category/login'
            element={
              <ProtectedRoute>
                <Login />
              </ProtectedRoute>
            }
          />

          <Route
            path='/settings'
            element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            }
          />

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
    </>
  );
}
