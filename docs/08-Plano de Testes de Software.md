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

## Ferramentas de Testes
Ferramenta de teste utilizada: [POSTMAN](https://www.postman.com).
