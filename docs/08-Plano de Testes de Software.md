# Plano de Testes de Software

#### RF-001 - O sistema deve permitir que a empresa crie uma conta e faça o login.	
- **URL Local:** `https://localhost:7014/api/Auth`
- **Método:** `POST`
- **Corpo da Requisição:**
  ```json
   {
     "password": "user",
     "email": "user@example.com",
     "name": "teste",
     "cnpj": "331293210390",
     "role": "string"
   }
  ```
- **Resposta:** Evento criado com status 201.

#### RF-002 - O sistema deve permitir que o usuário cadastre produtos.		
- **URL Local:** `https://localhost:7014/api/Produtos`
- **Método:** `POST`
- **Corpo da Requisição:**
  ```json
    {
      "nome": "teste",
      "descricao": "teste",
      "quantidade": 3,
      "valor": 254.99,
      "localizacao": "a1231",
      "codigoProduto": "adoakmsdoasmo",
      "estadoProduto": 0,
      "categoria": 0,
      "fornecedorId": "66115a89d926b33ca9861532",
      "usuarioId": "660f3988f53e5653efaf5441"
    }
  ```
- **Resposta:** Evento criado com status 201.

#### RF-006 - O sistema deve incorporar recursos de localização que permitam aos usuários identificar a posição de um produto dentro de um determinado local.	
- **URL Local:** `https://localhost:7014/api/Produtos/661351df2519dedf9d031c7a`
- **Método:** `GET`
- **Corpo da Requisição:**
  ```json
    {
        "id": "661351df2519dedf9d031c7a",
        "nome": "teste",
        "descricao": "teste",
        "quantidade": 3,
        "valor": 254.99,
        "localizacao": "a1231",
        "codigoProduto": "adoakmsdoasmo",
        "estadoProduto": 0,
        "categoria": 0,
        "fornecedorId": "66115a89d926b33ca9861532",
        "fornecedor": {
            "id": "66115a89d926b33ca9861532",
            "nome": "AMAZON SERVICOS DE VAREJO DO BRASIL LTDA.",
            "cnpjCpf": "15.436.940/0001-03",
            "email": "amzbr-tax-compliance@amazon.com",
            "usuarioId": "660f3988f53e5653efaf5441",
            "usuario": {
                "id": "660f3988f53e5653efaf5441",
                "password": "teste",
                "email": "teste@example.com",
                "name": "teste 123",
                "cnpj": "2213123123333",
                "role": "string"
            }
        },
        "usuarioId": "660f3988f53e5653efaf5441",
        "usuario": {
            "id": "660f3988f53e5653efaf5441",
            "password": "teste",
            "email": "teste@example.com",
            "name": "teste 123",
            "cnpj": "2213123123333",
            "role": "string"
        }
    }
  ```
- **Resposta:** Evento criado com status 200. Iremos receber os dados e está ali o recurso de localização.

#### RF-009 - O sistema deve permitir o registro do fornecedor associado a cada produto, facilitando a identificação e o histórico de fornecedores para futuras compras.		
- **URL Local:** `https://localhost:7014/api/Produtos`
- **Método:** `POST`
- **Corpo da Requisição:**
  ```json
    {
  "id": "1df2519dedf9d031",
  "nome": "teste",
  "descricao": "teste",
  "quantidade": 0,
  "valor": 0,
  "localizacao": "111ass",
  "codigoProduto": "115a89d926b33ca98",
  "estadoProduto": 0,
  "categoria": 2,
  "fornecedorId": "d0s98a53511o1180",
  "fornecedor": {
    "id": "73218053289",
    "nome": "teste",
    "cnpjCpf": "09873217890",
    "email": "teste@teste.com",
    "usuarioId": "3543412as31256",
    "usuario": {
      "id": "string",
      "password": "string",
      "email": "user@example.com",
      "name": "string",
      "cnpj": "string",
      "role": "string"
      }
  ```
- **Resposta:** Evento criado com status 201.

#### RF-010 - O sistema deve exibir os produtos com estoque zerado, estoque mínimo e quantos estão cadastrados.	
- **URL Local:** `https://localhost:7014/api/Produtos`
- **Método:** `POST`
- **Corpo da Requisição:**
  ```json
    {
  "id": "19deddf2519f9d031",
  "nome": "testando",
  "descricao": "teste",
  "quantidade": 0,
  "valor": 120,
  "localizacao": "1211",
  "codigoProduto": "645432412",
  "estadoProduto": 1,
  "categoria": 0,
  "fornecedorId": "teste",
      }
  ```
- **Resposta:** Evento criado com status 201.
## Ferramentas de Testes
Ferramenta de teste utilizada: [POSTMAN](https://www.postman.com).
