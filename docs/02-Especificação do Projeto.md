# Especificações do Projeto

Definição do problema e ideia de solução a partir da perspectiva do usuário. É composta pela definição do  diagrama de personas, histórias de usuários, requisitos funcionais e não funcionais além das restrições do projeto.

Apresente uma visão geral do que será abordado nesta parte do documento, enumerando as técnicas e/ou ferramentas utilizadas para realizar a especificações do projeto

## Personas

| <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSowyIPHTZzLfrZqdAxwjLtEjQEPoISoeIwqxpiL-frK3DA_wCamj7_8ie3ICiAyFxlz4&usqp=CAU" width="320" height="200"/> | José Silva, 32 anos|
| ------------------------------------------------------------------------- | ------------------------------------------------------------------|
| Ocupação:                                                       | Chefe de uma empresa                                                                                         |
| Aplicativos:                                                    | Instagram, Youtube, Whatsapp, Tik-tok.                                                        |
| Motivações:                                                     | Desejo de administrar melhor seu estoque de produtos e ter uma estimativa de como está a relação de produtos e vendas.|       
| Frustrações:                                                    | Dificuldade de administrar o estoque de seus produtos; Não ter uma projeção de vendas e estoque de seu produto.|
| Hobbies, História:                                              | Gosta de pesquisar sobre empreendedorismo; Apaixonado por administrção de negócios.|
<div align="center"><sup>Figura 3 - Persona 1</sup></div>
<br/>

| <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0E6GjAU2k8qtLIQq_X4q8oI5Y7geOcThsEQ&usqp=CAU" width="320" height="200"/>  | Maria Oliveira, 26 anos|
| ------------------------------------------------------------------------- | ------------------------------------------------------------------|
| Ocupação:                                                       | Chefe de Almoxarifado em uma indústria de logística                                                     |
| Aplicativos:                                                    | Microsoft Excel, WhatsApp, Slack, Sistema de Gestão de Estoque                                      |
| Motivações:                                                     | Aperfeiçoar o controle de estoque, otimizando processos logísticos; Busca por eficiência e redução de custos.|       
| Frustrações:                                                    | Dificuldades na rastreabilidade de produtos; Falta de integração entre setores; Desafios na gestão de inventário.|
| Hobbies, História:                                              | Apaixonada por logística e gestão de cadeia de suprimentos; Participa de cursos sobre tecnologias aplicadas à logística.|
<div align="center"><sup>Figura 4 - Persona 2</sup></div>
<br/>


| <img src="https://media.istockphoto.com/id/1392528328/pt/foto/portrait-of-smiling-handsome-man-in-white-t-shirt-standing-with-crossed-arms.webp?b=1&s=170667a&w=0&k=20&c=MeBhhGQ9bghlVjKjtswn0aGBxsmlDBj8aNrhd_aZ1HY=" width="320" height="200"/> | Carlos Gomes, 27 anos|
| ------------------------------------------------------------------------- | ------------------------------------------------------------------|
| Ocupação:                                                       | Gestor de empresas                                                                                                      |
| Aplicativos:                                                    | Youtube, Whatsapp, Linked-in.                                                        |
| Motivações:                                                     | Melhorar a gerência de produtos de sua empresa, melhorar o CRUD de produtos e ter uma visão melhor dos produtos de sua empresa|       
| Frustrações:                                                    | Não conseguir administrar bem seus negócios usando as planilhas tradicionais.|
| Hobbies, História:                                              | Política e economia; Música; Fascinado por computadores e Internet das coisas (IOT)          |
<div align="center"><sup>Figura 5 - Persona 3</sup></div>
<br/>

| <img src="https://www.geradordeideias.com/blog/wp-content/uploads/2020/03/Perfil-de-consumo-da-mulher-brasileira.jpg" width="320" height="200"/> | Fernanda Soares, 45 anos|
| ------------------------------------------------------------------------- | ------------------------------------------------------------------|
| Ocupação:                                                       | Analista de dados                                                                                          |
| Aplicativos:                                                    | Instagram, Youtube, Whatsapp, Linked-in.                                                        |
| Motivações:                                                     | Análise de dados de estoque, geração de relatórios personalizados, identificação de padrões e tendências para otimização do estoque.|       
| Frustrações:                                                    | Enfrenta dificuldades devido à falta de integração entre sistemas. Os dados relevantes para análise de estoque estão dispersos em diferentes plataformas, tornando difícil obter uma visão unificada.|
| Hobbies, História:                                              | Musculação; Caminhada ao ar livre; Desenhista nas horas vagas.                   |
<div align="center"><sup>Figura 6 - Persona 4</sup></div>
<br/>

## Histórias de Usuários

Com base na análise das personas forma identificadas as seguintes histórias de usuários:

|EU COMO... `PERSONA`| QUERO/PRECISO ... `FUNCIONALIDADE` |PARA ... `MOTIVO/VALOR`                 |
|--------------------|------------------------------------|----------------------------------------|
|Chefe de uma empresa | Relatório de vendas por produto |Tomar decisões sobre o estoque mais facilmente. |
|Chefe de uma empresa | De um Sistema de alerta de estoque baixo | Garantir a disponibilidade de produtos. |
|Gestor de empresas |Interface intuitiva para cadastro e atualização de produtos |agilizar o processo de gerenciamento de produtos e manter as informações atualizadas |
|Gestor de empresas |Dashboard de análise de produtos |Identificar oportunidades de crescimento, otimizar o mix de produtos e aumentar a rentabilidade do negócio. |
|Analista de dados | Geração de relatórios personalizados |Facilitar a tomada de decisões baseadas em dados e aumentar a eficácia das estratégias de estoque. |
|Analista de dados | Identificar padrões e tendências para otimização do estoque |antecipar demandas futuras, evitar excesso ou falta de produtos e maximizar a eficiência operacional |

## Modelagem do Processo de Negócio 

### Análise da Situação Atual
A criação de um aplicativo de estoque que funcione em dispositivos móveis e desktops pode ser vantajosa, pois atende a uma variedade de usuários com diferentes preferências
de dispositivo. Isso pode aumentar a acessibilidade e a usabilidade do aplicativo, permitindo que os usuários acessem o estoque de qualquer lugar. No entanto, é importante 
garantir uma experiência consistente em todas as plataformas, adaptando a interface de acordo com o tamanho da tela e considerando as funcionalidades específicas de cada aplicativo.
Além disso, é crucial garantir a segurança dos dados, especialmente ao lidar com informações seinsíveis de estoque.

### Descrição Geral da Proposta

A proposta consiste na criação de um aplicativo de gestão de estoque que seja acessível tanto em dispositivos móveis quanto em desktops. Este aplicativo visa fornecer uma solução
abrangente para o gerenciamento eficiente do estoque de uma empresa, permitindo aos usuários acessar e atualizar informações sobre o inventário, pedidos, fornecedores e vendas
em tempo real, independentemente do dispositivo que estão utilizando. A interface do aplicativo será adaptada para fornecer uma experiẽncia de usuário intuitiva e consistente,
independentemente do tamanho da tela ou do tipo de dispositivo, enquanto são implementadas medidas de segurança robustas para proteger os dados sensíveis do estoque.

### Processo 1 – NOME DO PROCESSO

Apresente aqui o nome e as oportunidades de melhorias para o processo 1. Em seguida, apresente o modelo do processo 1, descrito no padrão BPMN. 

![Processo 1](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-proj-infra-t4-pmv-ads-2024-1-e4-proj-infra-t4-estoque/blob/main/docs/img/Estoque1%20Diagrama.png)

### Processo 2 – NOME DO PROCESSO

Apresente aqui o nome e as oportunidades de melhorias para o processo 2. Em seguida, apresente o modelo do processo 2, descrito no padrão BPMN.

![Processo 2](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-proj-infra-t4-pmv-ads-2024-1-e4-proj-infra-t4-estoque/blob/main/docs/img/Estoque2.png)

## Indicadores de Desempenho


| **Indicador** | **Objetivos** | **Descrição** | **Fonte dados** | **Perspectiva** |
| ---           | ---           | ---           | ---             | ---             |
| Qualidade do uso do app | Avaliar crescimento de cadastro de empresas | Percentual de novos cadastros no mês | Banco de dados com cadastros | Crescimento da plataforma |
| Eficiência no controle de estoque | Ver a velocidade de resposta ao criar um estoque | Velocidade de criação de estoque | Sistema de Controle de Estoque | Eficiência Operacional |
| Administração de controle de estoque | Ver a eficiência dos CRUDs de novos produtos | Eficiência de administração de estoque | Sistema de Controle de Estoque | Eficiência Administrativa |

Obs.: todas as informações para gerar os indicadores devem estar no diagrama de classe a ser apresentado a posteriormente. 


## Requisitos

As tabelas que se seguem apresentam os requisitos funcionais e não funcionais que detalham o escopo do projeto. Para determinar a prioridade de requisitos, aplicar uma técnica de priorização de requisitos e detalhar como a técnica foi aplicada.

### Requisitos Funcionais(RF):

Os requisitos funcionais são as descriçõoes detalhadas das funções que um sistema, software oou produto deve executar. Especificam o comportamento funcional esperado do sistema sob diferentes condições.

|ID    | Descrição do Requisito  											                                           | Prioridade |
|------|-----------------------------------------------------------------------------------------|------------|
|RF-001| O sistema deve permitir que a empresa crie uma conta e faça o login. 				                |  ALTA | 
|RF-002| O sistema deve permitir que o usuário cadastre produtos.   		                      				|  ALTA |
|RF-003| O sistema deve oferecer o monitoramento em tempo real de cada produto em estoque.	     	    |  ALTA |
|RF-004| O sistema deve ter um recurso de busca avançado para encontrar produtos.		                  | MÉDIA |
|RF-005| O sistema dever ter um relatório com a descrição dos produtos, a quantidade, etc.            | MÉDIA |
|RF-006| O sistema deve incorporar recursos de localização que permitam aos usuários identificar a posição de um produto dentro de um determinado local.          |  ALTA |
|RF-007| O sistema deve alertar o usuário, quando um produto estiver em pouca quantidade no estoque.  | MÉDIA |
|RF-008| O sistema deve poder registrar e monitorar produtos danificados, vencidos, reembolsados ou obsoletos para ações corretivas.   | MÉDIA |
|RF-009| O sistema deve permitir o registro do fornecedor associado a cada produto, facilitando a identificação e o histórico de fornecedores para futuras compras. | MÉDIA |
|RF-010| O sistema deve exibir os produtos que tiveram o maior volume de vendas.  | BAIXA |

### Requisitos Não Funcionais(RNF):

Os requisitos não funcionais correspondem a uma característica técnica, seja de usabilidade, desempenho, confiabilidade, segurança ou outro (ex: suporte a dispositivos iOS e Android).

|ID      | Descrição do Requisito  														                                                                   | Prioridade |
|--------|-----------------------------------------------------------------------------------------------------------------------|------------|
|RNF-001 | O sistema deve ser altamente seguro, protegendo os dados do estoque contra acesso não autorizado. 		                      | MÉDIA | 
|RNF-002 | O sistema deve ser escalável para lidar com o aumento de produtos conforme o crescimento da empresa.	 	                    |  ALTA | 
|RNF-003 | O sistema deve ter alta disponibilidade, minimizando o tempo de inativaidade.						                                  |  ALTA | 
|RNF-004 | O sistema deve ser compatível com diferentes dispositivos (Android e IOS) e navegadores (Chrome e Opera). |                |  ALTA |       
|RNF-005 | O sistema deve ter um desempenho alto, garantindo tempos de resposta rápidos para consultas de estoque e dados. 	          |  ALTA | 
|RNF-006 | O sistema deve ter um desempenho uma interface intuitiva e amigável para facilitar a navegação. 	                          | MÉDIA | 
|RNF-007 | O sistema deve ser responsivo, podendo se adaptar de forma adequada a diferentes dispositivos e tamanhos de tela.  	      |  ALTA | 

## Restrições

O projeto está restrito pelos itens apresentados na tabela a seguir.

|ID| Restrição                                             |
|--|-------------------------------------------------------|
|01| O projeto deverá ser entregue até o final do semestre |
|02| Não pode ser desenvolvido um módulo de backend        |
|03| A equipe não pode subcontratar o desenvolvimento do trabalho.        |

## Diagrama de Casos de Uso

O diagrama de casos de uso é o próximo passo após a elicitação de requisitos, que utiliza um modelo gráfico e uma tabela com as descrições sucintas dos casos de uso e dos atores. Ele contempla a fronteira do sistema e o detalhamento dos requisitos funcionais com a indicação dos atores, casos de uso e seus relacionamentos. 

<img src=https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-proj-infra-t4-pmv-ads-2024-1-e4-proj-infra-t4-estoque/blob/main/docs/img/Diagrama%20de%20caso%20de%20uso.png/>

# Gerenciamento de Projeto

De acordo com o PMBoK v6 as dez áreas que constituem os pilares para gerenciar projetos, e que caracterizam a multidisciplinaridade envolvida, são: Integração, Escopo, Cronograma (Tempo), Custos, Qualidade, Recursos, Comunicações, Riscos, Aquisições, Partes Interessadas. Para desenvolver projetos um profissional deve se preocupar em gerenciar todas essas dez áreas. Elas se complementam e se relacionam, de tal forma que não se deve apenas examinar uma área de forma estanque. É preciso considerar, por exemplo, que as áreas de Escopo, Cronograma e Custos estão muito relacionadas. Assim, se eu amplio o escopo de um projeto eu posso afetar seu cronograma e seus custos.

## Gerenciamento de Tempo

Com diagramas bem organizados que permitem gerenciar o tempo nos projetos, o gerente de projetos agenda e coordena tarefas dentro de um projeto para estimar o tempo necessário de conclusão.

![Diagrama de rede simplificado notação francesa (método francês)](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-proj-infra-t4-pmv-ads-2024-1-e4-proj-infra-t4-estoque/blob/3e5d9374ef5f5d5e3420f6a3ec13862e995de360/docs/img/GRÁFICO%20TEMPORAL.png)

O gráfico de Gantt ou diagrama de Gantt também é uma ferramenta visual utilizada para controlar e gerenciar o cronograma de atividades de um projeto. Com ele, é possível listar tudo que precisa ser feito para colocar o projeto em prática, dividir em atividades e estimar o tempo necessário para executá-las.

![Gráfico de Gantt](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-proj-infra-t4-pmv-ads-2024-1-e4-proj-infra-t4-estoque/blob/103315c9e1a14d4dc928e3f07b3cce12e30c3dd8/docs/img/GRÁFICO%20GANTT.png)

## Gerenciamento de Equipe

O gerenciamento adequado de tarefas contribuirá para que o projeto alcance altos níveis de produtividade. Por isso, é fundamental que ocorra a gestão de tarefas e de pessoas, de modo que os times envolvidos no projeto possam ser facilmente gerenciados. 

<img src="https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-proj-infra-t4-pmv-ads-2024-1-e4-proj-infra-t4-estoque/blob/main/docs/img/gerenciamentoEquipe.png"/>

