# Programação de Funcionalidades

## Visão Geral
A API do Stock Flow permite aos usuários gerenciar seu estoque de produtos, visualizar relatórios de entradas e saídas dos produtos e autenticação dos usuários.

## Documentação da API
A documentação completa pode ser acessada pelo swagger ao rodar a API 

## Configuração Local
- **Banco de Dados:** MongoDB roda localmente.
- **Servidor:** API em .NET, inicia localmente com IIS Express.


## RF-1

**Descrição:**

Permitir que o usuário gerencie produtos

**Artefatos:**

- src\API_ControleDeEstoque\Controllers\ProdutosController.cs
- src\API_ControleDeEstoque\Models\Entites\Produto.cs
- src\API_ControleDeEstoque\Services\ProdutosService.cs

**Estrutura de dados utilizada:**

- Classe `produtos`: Armazena informações de produtos.
- Banco MongoDB: Armazena os dados dos produtos.

**Acesso e verificação:**

- GET, POST /api/Produtos
- PUT, DELETE /api/Produtos/{id}

## RF-2

**Descrição:**

Permitir que o usuário faça login.

**Artefatos:**

- src\API_ControleDeEstoque\Controllers\AuthController.cs
- src\API_ControleDeEstoque\Services\AuthService.cs
- src\API_ControleDeEstoque\Dtos\LoginRequest.cs
- src\API_ControleDeEstoque\Dtos\LoginResponse.cs
- src\API_ControleDeEstoque\Dtos\RegisterRequest.cs
- src\API_ControleDeEstoque\Dtos\RegisterResponse.cs


**Estrutura de dados utilizada:**

- Classe `users`: Armazena informações de usuários.
- Classe `roles`: Armazena permissões de usuários.
- Banco MongoDB: Armazena os dados dos usuários.


**Acesso e verificação:**

- POST /api/Auth/roles
- POST /api/Auth/register
- POST /api/Auth/login

## RF-3
**Descrição:**

Criar um Pdf com as informações contidas na tabela

**Artefatos:**

- API_ControleDeEstoque\Controllers\PDFGenController.cs

**Estrutura de dados utilizada:**

- Classe `pdfgencontroller`: Armazena informações de entradas de produto.
- Banco MongoDB: Armazena as informações do produto.

**Acesso e verificação:**

- GET /api/PDFGen/Gerar/{id}

## RF-4

**Descrição:**

Notificar os desenvolvedores sobre as possíveis falhas e problemas na aplicação

**Artefatos:**
- src/API_ControleDeEstoque\Controllers\FeedBackController.cs
- src/API_ControleDeEstoque\Controllers\FeedBackController.cs
- src\API_ControleDeEstoque\Services\EmailService.cs
- 
**Estrutura de dados utilizada:**

- Classe `enviarfeedback`: Permite com que o usuário da aplicação informe os problemas através de um e-mail.
- Banco MongoDB: Armazena as informações sobre queixas de usuários.


**Acesso e verificação:**

- /api/FeedBack/EnviarFeedBack



## RF-7

**Descrição:**

Permitir que o usúario gerencie fornecedores.


**Artefatos:**
C:\Users\adm\Pictures\pmv-ads-2024-1-e4-proj-infra-t4-pmv-ads-2024-1-e4-proj-infra-t4-estoque\src\API_ControleDeEstoque\Models\Entites\Fornecedor.cs
- src\API_ControleDeEstoque\Services\FornecedoresService.cs
- src\API_ControleDeEstoque\Controllers\FornecedoresController.cs
- src\API_ControleDeEstoque\Models\Entites\Fornecedor.cs

**Estrutura de dados utilizada:**

- Classe `fornecedores`: Armazena informações de fornecedores.
- Banco MongoDB: Armazena os dados dos fornecedores cadastrados.

**Acesso e verificação:**

- GET, POST /api/v1/fornecedores
- PUT, DELETE /api/v1/fornecedores/{id}
