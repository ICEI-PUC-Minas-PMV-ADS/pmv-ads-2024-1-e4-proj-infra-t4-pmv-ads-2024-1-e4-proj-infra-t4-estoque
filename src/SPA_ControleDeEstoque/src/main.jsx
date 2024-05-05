import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { GlobalStyle } from "./GlobalStyled.jsx";
import Header from "./components/Header/Header.jsx";

import Home from "./pages/Home/Home.jsx";
import Fornecedor from "./pages/Fornecedores/Fornecedor/Fornecedores.jsx";
import AddFornecedor from "./pages/Fornecedores/AddFornecedor/AddFornecedor.jsx";
import ConfiguracaoPerfil from "./pages/ConfiguracaoPerfil/ConfiguracaoPerfil.jsx";
import EditFornecedor from "./pages/Fornecedores/EditFornecedor/EditFornecedor.jsx";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GlobalStyle />

    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/fornecedores" element={<Fornecedor />} />
        <Route path="/addFornecedor/:usuarioId" element={<AddFornecedor />} />
        <Route path="/Admin" element={<Admin />} />

        <Route path="/editFornecedor/:id" element={<EditFornecedor />} />
        <Route path="/ConfiguracaoPerfil" element={<ConfiguracaoPerfil />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
