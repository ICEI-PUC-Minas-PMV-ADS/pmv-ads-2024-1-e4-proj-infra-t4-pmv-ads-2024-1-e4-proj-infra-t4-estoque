# Plano de Testes de Software


| **Caso de Teste** 	| **CT-01 – Login de usuário.** 	|
|:---:	|:---:	|
|	Requisito Associado 	| RF-001 - O sistema deve permitir que a empresa crie uma conta e faça o login.  |
| Objetivo do Teste 	| Verificar se o usuário consegue realizar login. |
| Passos 	| - Acessar a aplicação <br> - Preencher os campos obrigatórios <br> - Aguardar o direcionamento para a página inicial. 
|Critério de Êxito | - O usuário conseguiu acessar os componentes da aplicação com sucesso. |

| **Caso de Teste** 	| **CT-02 – Criar Produto.** 	|
|:---:	|:---:	|
|	Requisito Associado 	| RF-002 - O sistema deve permitir que o usuário cadastre produtos. |
| Objetivo do Teste 	| Criar produto. |
| Passos 	| - Acessar a aplicação <br> - Inserir os dados de login. <br> - Redirecionamento para a página inicial. <br> Acessar a página de adicionar produtos. <br> - Clicar em "Novo Produto". <br> - Preencher as informações solicitadas e clicar em "Salvar". |
|Critério de Êxito | -  Produto criado com sucesso. |


| **Caso de Teste** 	| **CT-03 – Gestão de produtos.** 	|
|:---:	|:---:	|
|	Requisito Associado 	| RF-009 - O sistema deve permitir o registro do fornecedor associado a cada produto, <br> facilitando a identificação e o histórico de fornecedores para futuras compras. |
| Objetivo do Teste 	| Verificar se o usuário consegue gerenciar produtos. |
| Passos 	| - Acessar a aplicação <br> - Inserir os dados de login. <br> - Ir para página inicial. <br> Acessar a página de produtos. <br> - Acessar o produto desejado. <br> - Efetuar alterações(nome, quantidade). <br> - Selecionar fornecedor desejado. "Confirmar"|
|Critério de Êxito | - Usuário obteve sucesso ao gerenciar produtos. |


| **Caso de Teste** 	| **CT-04 – Buscar produtos.** 	|
|:---:	|:---:	|
|	Requisito Associado 	| RF-004 - O sistema deve ter um recurso de busca avançado para encontrar produtos. |
| Objetivo do Teste 	| Busca avançada por produto. |
| Passos 	| - Acessar a aplicação <br> - Inserir os dados de login. <br> - Ir para página inicial. <br> Acessar a página de produtos. <br> - Clicar em "Buscar produto". <br> - Preencher as informações desejadas e clicar em "Confirmar". |
|Critério de Êxito | -  Fornecedor criado com sucesso. |


| **Caso de Teste** 	| **CT-05 – Alerta de estoque.** 	|
|:---:	|:---:	|
|	Requisito Associado 	| RF-007	O sistema deve alertar o usuário, quando um produto  estiver em pouca quantidade <br> no estoque. |
| Objetivo do Teste 	| Notificar o usuário sobre seus produtos com baixo estoque. |
| Passos 	| - Acessar a aplicação <br> - Inserir os dados de login. <br> - Ir para página inicial. <br> Acessar a página de produtos. <br> - Verificar informações (nome, quantidade, fornecedor). <br> - Salvar alterações.|
|Critério de Êxito | - Usuário obteve sucesso ao gerenciar fornecedores. |
