import { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { ButtonSearch, ContainerButton, ContainerHeaderHome, ContainerHome, ContainerSearch, ContainerTable, LeftTitle, ContainerTableMobile } from './HomeStyled';
import { Button } from '../../components/Button/Button';
import { Link } from 'react-router-dom';

import Header from '../../components/Header/Header';

export default function Home() {
    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const userId = localStorage.getItem('userId', data.userId);

    const produtoGet = async () => {
        try {
            const response = await axios.get(`https://localhost:44398/api/Produtos/usuarioIdProdutos?usuarioId=${userId}`);
            setData(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    function mascara(valor, campo) {
        var valorAlterado = String(valor);

        if (typeof valorAlterado === 'string') {
            valorAlterado = valorAlterado.replace(/\D/g, ""); // Remove todos os não dígitos
            valorAlterado = valorAlterado.replace(/(\d+)(\d{2})$/, "$1,$2"); // Adiciona a parte de centavos
            valorAlterado = valorAlterado.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1."); // Adiciona pontos a cada três dígitos

            if (campo === 'valor' || campo === 'valorUnidade') {
                return valorAlterado;
            }
        }

        return valor;
    }


    const getEstadoProdutoNome = (estadoProduto) => {
        switch (estadoProduto) {
            case 0:
                return 'Produtos em boas condições';
            case 1:
                return 'Produto danificado';
            case 2:
                return 'Produto vencido';
            case 3:
                return 'Produto reembolsado';
            case 4:
                return 'Produto obsoleto';
            case 5:
                return 'Produto vendido - FINALIZADO';
            default:
                return '';
        }
    };

    const getCategoriaNome = (categoria) => {
        switch (categoria) {
            case 0:
                return 'Sem Categoria';
            case 1:
                return 'Roupa';
            case 2:
                return 'Sapato';
            case 3:
                return 'Cosmético';
            case 4:
                return 'Alimento';
            case 5:
                return 'Eletrônico';
            case 6:
                return 'Eletrodoméstico';
            default:
                return '';
        }
    };

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    useEffect(() => {
        produtoGet();
    }, []);

    return (
        <>
            <Header />
            <ContainerHome>
                <ContainerHeaderHome>
                    <div>
                        <LeftTitle style={{ paddingLeft: "20px", fontSize: "30px" }}>
                            ESTOQUE DE PRODUTOS
                        </LeftTitle>
                    </div>
                </ContainerHeaderHome>
                <br />

                <ContainerButton>
                    <ContainerSearch>
                        <input type="text" placeholder="PROCURAR" value={searchTerm} onChange={handleSearch} />
                        <ButtonSearch>
                            <FontAwesomeIcon icon={faSearch} />
                        </ButtonSearch>
                    </ContainerSearch>

                    <Link to={`/AddProduto/${userId}`}>
                        <Button style={{ justifyContent: "flex-end" }}
                            text="ADICIONAR PRODUTO"
                            className="button-add-desktop"
                            type="button"
                        />
                        <i className="bi bi-plus-square-fill"></i>
                    </Link>
                </ContainerButton>
                <br />

                <ContainerTable className="table-desktop">
                    <table className="table table-bordered">
                        <thead style={{ backgroundColor: '#f8f9fc' }}>
                            <tr>
                                <th>ID</th>
                                <th>NOME DO PRODUTO</th>
                                <th>QUANTIDADE</th>
                                <th>CATEGORIA</th>
                                <th>ESTADO DO PRODUTO</th>
                                <th>CÓDIGO PRODUTO</th>
                                <th>LOCALIZAÇÃO</th>
                                <th>VALOR UNIDADE</th>
                                <th>VALOR TOTAL</th>
                                <th>EDITAR</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.filter(produto => {
                                if (searchTerm === '') {
                                    return true;
                                } else {
                                    return (
                                        produto.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                        produto.quantidade.toString().includes(searchTerm.toLowerCase()) ||
                                        getCategoriaNome(produto.categoria).toLowerCase().includes(searchTerm.toLowerCase()) ||
                                        getEstadoProdutoNome(produto.estadoProduto).toLowerCase().includes(searchTerm.toLowerCase()) ||
                                        produto.codigoProduto.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                        produto.localizacao.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                        produto.valor.toString().includes(searchTerm.toLowerCase()) ||
                                        produto.valorUnidade.toString().includes(searchTerm.toLowerCase())
                                    );
                                }
                            }).map(produto => (
                                <tr key={produto.id}>
                                    <td>{produto.id}</td>
                                    <td>{produto.nome}</td>
                                    <td>{produto.quantidade}</td>
                                    <td>{getCategoriaNome(produto.categoria)}</td>
                                    <td>{getEstadoProdutoNome(produto.estadoProduto)}</td>
                                    <td>{produto.codigoProduto}</td>
                                    <td>{produto.localizacao}</td>
                                    <td>R$ {mascara(produto.valor, 'valor')}</td>
                                    <td>R$ {mascara(produto.valorUnidade, 'valorUnidade')}</td>
                                    <td>
                                        <Link to={`/EditProduto/${produto.id}`}>
                                            <Button
                                                text='Editar'
                                                type='button'
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
                        <thead style={{ backgroundColor: '#f8f9fc' }}>
                            <tr>
                                <th>ID</th>
                                <th>NOME</th>
                                <th>QUANT.</th>
                                <th>TOTAL</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.filter(produto => {
                                if (searchTerm === '') {
                                    return true;
                                } else {
                                    return (
                                        produto.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                        produto.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                        produto.quantidade.toString().includes(searchTerm.toLowerCase()) ||
                                        produto.valor.toString().includes(searchTerm.toLowerCase())
                                    );
                                }
                            }).map(produto => (
                                <tr key={produto.id}>
                                    <td style={{ maxWidth: '100px', wordWrap: 'break-word' }}>{produto.id}</td>
                                    <td style={{ maxWidth: '100px', wordWrap: 'break-word' }}>{produto.nome}</td>
                                    <td style={{ maxWidth: '100px', wordWrap: 'break-word' }}>{produto.quantidade}</td>
                                    <td>{mascara(produto.valor, 'valor')}</td>
                                    <td>
                                        <Link to={`/EditProduto/${produto.id}`}>
                                            <Button
                                                text='Editar'
                                                type='button'
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
            </ContainerHome >
        </>
    );
}
