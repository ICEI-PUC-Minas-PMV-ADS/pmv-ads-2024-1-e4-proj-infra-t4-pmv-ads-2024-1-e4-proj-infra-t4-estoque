import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GlobalStyle } from "./GlobalStyled.jsx";

import Home from "./pages/Home/Home.jsx";
import Fornecedor from "./pages/Fornecedores/Fornecedor/Fornecedores.jsx";
import AddFornecedor from "./pages/Fornecedores/AddFornecedor/AddFornecedor.jsx";
import ConfiguracaoPerfil from "./pages/ConfiguracaoPerfil/ConfiguracaoPerfil.jsx";
import EditFornecedor from "./pages/Fornecedores/EditFornecedor/EditFornecedor.jsx";
import Admin from "./pages/Admin/Admin.jsx";
import Start from "./pages/Start/Start.jsx";
import Login from "./pages/Start/Login.jsx";
import AddProduto from "./pages/Home/AddProduto/AddProduto.jsx";
import EditProduto from "./pages/Home/EditProduto/EditProduto.jsx"


createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GlobalStyle />



    <BrowserRouter>

      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home/:userId" element={<Home />} />
        <Route path="/fornecedores/:userId" element={<Fornecedor />} />
        <Route path="/addFornecedor/:userId" element={<AddFornecedor />} />
        <Route path="/AddProduto/:userId" element={<AddProduto />} />
        <Route path="/Admin" element={<Admin />} />

        <Route path="/editFornecedor/:id" element={<EditFornecedor />} />
        <Route path="/EditProduto/:id" element={<EditProduto />} />
        <Route path="/ConfiguracaoPerfil/:usuarioId" element={<ConfiguracaoPerfil />} />
      </Routes>
      </BrowserRouter>
     
  </React.StrictMode>
);
