import { useState, useEffect } from "react";

import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import {
  ButtonSearch,
  ContainerButton,
  ContainerHeaderHome,
  ContainerHome,
  ContainerSearch,
  ContainerTable,
  LeftTitle,
} from "./FornecedoresStyled";
import { Button } from "../../components/Button/Button";
import { Link } from "react-router-dom";

export default function Fornecedor() {
  const baseUrl =
    "http://localhost:5020/api/Fornecedores/usuarioIdFornecedores?usuarioId=b72d1cb4-31c7-479c-81cc-fa4c4c35892e";
  const [data, setData] = useState([]);

  const fornecedorGet = async () => {
    await axios
      .get(baseUrl)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fornecedorGet();
  }, []);

  return (
    <>
      <ContainerHome>
        <br />
        <br />
        <ContainerHeaderHome>
          <div>
            <LeftTitle style={{ paddingLeft: "20px", fontSize: "30px" }}>
              FORNECEDORES
            </LeftTitle>
          </div>
        </ContainerHeaderHome>
        <br />

        <ContainerButton>
          <ContainerSearch>
            <input type="text" placeholder="PROCURAR" />
            <ButtonSearch>
              <FontAwesomeIcon icon={faSearch} />
            </ButtonSearch>
          </ContainerSearch>
          <Link to="/as">
            <Button
              style={{ justifyContent: "flex-end" }}
              text="ADICIONAR PRODUTO"
              type="button"
            ></Button>
          </Link>
        </ContainerButton>
        <br />

        <ContainerTable>
          <table className="table table-bordered">
            <thead style={{ backgroundColor: "#f8f9fc" }}>
              <tr>
                <th>ID</th>
                <th>CÓDIGO DO FORNECEDOR</th>
                <th>NOME DO FORNECEDOR</th>
                <th>EMAIL</th>
                <th>CNPJ</th>
              </tr>
            </thead>
            <tbody>
              {data.map((fornecedor) => (
                <tr key={fornecedor.id}>
                  <td>{fornecedor.id}</td>
                  <td>{fornecedor.codigoFornecedor}</td>
                  <td>{fornecedor.nome}</td>
                  <td>{fornecedor.email}</td>

                  <td>{fornecedor.cnpjCpf}</td>

                  <td>
                    <Button text="Editar" type="button" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </ContainerTable>
        <footer></footer>
      </ContainerHome>
    </>
  );
}
