import { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import {
  ButtonSearch,
  ContainerButton,
  ContainerHeaderFornecedor,
  ContainerFornecedor,
  ContainerSearch,
  ContainerTable,
  LeftTitle,
  ContainerTableMobile,
} from "./FornecedoresStyled";
import { Link } from "react-router-dom";
import { Button } from "../../../components/Button/Button";
import Header from "../../../components/Header/Header";

export default function Fornecedor() {
  const [data, setData] = useState([]);
  const userId = localStorage.getItem("userId", data.userId);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const fornecedorGet = async () => {
    try {
      const response = await axios.get(
        `https://localhost:44398/api/Fornecedores/usuarioIdFornecedores?usuarioId=${userId}`
      );
      setData(response.data);
    } catch (error) {
      console.error("Erro ao buscar fornecedores:", error);
    }
  };

  useEffect(() => {
    fornecedorGet();
  }, []);

  useEffect(() => {
    if (searchTerm === "") {
      setFilteredData(data);
    } else {
      const filtered = data.filter((fornecedor) =>
        fornecedor.nome.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredData(filtered);
    }
  }, [searchTerm, data]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <>
      <Header />
      <ContainerFornecedor>
        <br />
        <br />
        <ContainerHeaderFornecedor>
          <div>
            <LeftTitle style={{ paddingLeft: "20px", fontSize: "30px" }}>
              FORNECEDORES
            </LeftTitle>
          </div>
        </ContainerHeaderFornecedor>
        <br />

        <ContainerButton>
          <ContainerSearch>
            <input
              type="text"
              placeholder="PROCURAR"
              value={searchTerm}
              onChange={handleSearch}
            />
            <ButtonSearch>
              <FontAwesomeIcon icon={faSearch} />
            </ButtonSearch>
          </ContainerSearch>

          <Link to={`/addFornecedor/${userId}`}>
            <Button
              style={{ justifyContent: "flex-end" }}
              className="button-add-desktop"
              text="ADICIONAR FORNECEDOR"
              type="button"
            ></Button>
            <i className="bi bi-plus-square-fill"></i>
          </Link>
        </ContainerButton>
        <br />

        <ContainerTable className="table-desktop">
          <table className="table table-bordered">
            <thead style={{ backgroundColor: "#f8f9fc" }}>
              <tr>
                <th>CÓDIGO DO FORNECEDOR</th>
                <th>NOME DO FORNECEDOR</th>
                <th>EMAIL</th>
                <th>CNPJ</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((fornecedor) => (
                <tr key={fornecedor.id}>
                  <td>{fornecedor.codigoFornecedor}</td>
                  <td>{fornecedor.nome}</td>
                  <td>{fornecedor.email}</td>
                  <td>{fornecedor.cnpjCpf}</td>
                  <td>
                    <Link to={`/editFornecedor/${fornecedor.id}`}>
                      <Button
                        text="Editar"
                        type="button"
                        className="button-edit-desktop" // Esta classe é exibida apenas no desktop
                      />

                      <i className="bi bi-pencil-square"></i>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </ContainerTable>

        <ContainerTableMobile>
          <table className="table table-bordered">
            <thead style={{ backgroundColor: "#f8f9fc" }}>
              <tr>
                <th>CÓDIGO DO FORNECEDOR</th>
                <th>NOME DO FORNECEDOR</th>

                <th></th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((fornecedor) => (
                <tr key={fornecedor.id}>
                  <td>{fornecedor.codigoFornecedor}</td>
                  <td>{fornecedor.nome}</td>

                  <td>
                    <Link to={`/editFornecedor/${fornecedor.id}`}>
                      <Button
                        text="Editar"
                        type="button"
                        className="button-edit-desktop" // Esta classe é exibida apenas no desktop
                      />

                      <i className="bi bi-pencil-square"></i>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </ContainerTableMobile>
        <footer></footer>
      </ContainerFornecedor>
    </>
  );
}
