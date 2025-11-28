import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Bounce, ToastContainer } from "react-toastify";
import App from "./App";
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
    <ToastContainer
      position='top-center'
      autoClose={3000}
      limit={2}
      hideProgressBar={false}
      newestOnTop
      closeOnClick
      rtl={false}
      pauseOnFocusLoss={false}
      draggable
      pauseOnHover={false}
      theme='light'
      transition={Bounce}
    />
  </StrictMode>
);
