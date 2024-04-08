# Arquitetura da Solução

Definição de como o software é estruturado em termos dos componentes que fazem parte da solução e do ambiente de hospedagem da aplicação.

<div align="center"><img src="https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-proj-infra-t4-pmv-ads-2024-1-e4-proj-infra-t4-estoque/blob/main/docs/img/Arquitetura%20de%20solucao.png"/></div>

## Diagrama de Classes

O diagrama de classes ilustra graficamente como será a estrutura do software, e como cada uma das classes da sua estrutura estarão interligadas. Essas classes servem de modelo para materializar os objetos que executarão na memória.

<div align="center"><img src="https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-proj-infra-t4-pmv-ads-2024-1-e4-proj-infra-t4-estoque/blob/main/docs/img/DIAGRAMA%20DE%20CLASSES%20Diagrama.png" /></div>

## Modelo Físico

Entregar um arquivo banco.sql contendo os scripts de criação das tabelas do banco de dados. Este arquivo deverá ser incluído dentro da pasta src\bd.

## Tecnologias Utilizadas
Segue as tecnologias que foram utilizadas para a realização (desenvolvimento) desta aplicação distribuída.

### Linguagens de programação utilizada:
#### Desenvolvimento do backend:
> - **[C#](https://learn.microsoft.com/pt-br/dotnet/csharp/tour-of-csharp/): Linguagem de programação usada para o desenvolvimento do backend da solução. Juntamente com o framework web da Microsoft o ASP.NET.**

#### Desenvolvimento do frontend:
> - **[REACT](https://react.dev/): Framework utilizado para construir a aplicação web de forma dinâmica.**

#### IDE utilizada:
> - **[Visual Studio Community](https://visualstudio.microsoft.com/pt-br/): Foi escolhido devido a sua integração com o framework ASP.NET.**

#### Banco NoSQL utilizado:
> - **[MongoDB](https://www.mongodb.com/pt-br): Escolhemos este software devido ao fato de que cuida do armazenamento, atualização e recuperação de dados computacionais, permitindo toda esta administração de forma remota (através de rede / internet).**

#### Outras tecnologias utilizadas:
> - **[ASP.NET CORE MVC](https://learn.microsoft.com/en-us/aspnet/core/mvc/overview?view=aspnetcore-7.0): Foi utilizada esta tecnologia, pois implementa o padrão Model-View-Controller e oferece uma base padronizada e organizada para o desenvolvimento desta solução.**
> - **[Lucidchart](https://www.lucidchart.com/pages/): Ferramenta utilizada para o design dos diagramas.**
> - **[GitProjects](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2023-1-e2-proj-int-t2-mapeamento-consumo-energetico/projects?query=is%3Aopen): Ferramenta utilizada para realizar a gestão das tarefas do projeto.**
> - **[Canva](https://www.canva.com/): Ferramenta utilizada para criar os wireframes do projeto.**

## Hospedagem
Railway é uma plataforma de hospedagem e implantação de aplicativos que oferece uma abordagem simplificada para o processo de hospedagem e implantação de aplicativos da web. 

#### Configuração do Projeto:
Primeiro, feito  configuração do  projeto localmente.Foi usado as estruturas do  React e também c#.

#### Instalação do Railway CLI:
O Railway oferece uma CLI (Interface de Linha de Comando) que facilita a integração do  projeto com a plataforma. Foi  instalado  a CLI usando ferramentas de gerenciamento de pacotes npm.  

#### Login e Autenticação:
Após instalar a CLI, fazer login na  conta do Railway usando o comando railway login. Isso autentica a CLI para acessar a conta no Railway e realizar operações relacionadas ao projeto.

#### Adicionando o Projeto:
Com a CLI autenticada,pode adicionar o projeto ao Railway usando o comando railway init. Isso configura o projeto para ser implantado na plataforma.

#### Configuração do Banco de Dados e Variáveis de Ambiente:
Utilizado MongoDB as variáveis de ambiente com informações sensíveis, como chaves de API ou credenciais de banco de dados.

#### Implantação do Aplicativo:
Feito a  configuração do  aplicativo no Railway usando o comando railway up. Isso inicia o processo de implantação, onde o Railway compila e implanta o aplicativo em seus servidores.

## Qualidade de Software

A norma ISO 9126 é uma norma internacional que define um conjunto de características e subcaracterísticas para a avaliação da qualidade de software.  A escolha específica de características e subcaracterísticas dependerá das necessidades e objetivos do projeto de software.

<img src="https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-proj-infra-t4-pmv-ads-2024-1-e4-proj-infra-t4-estoque/blob/main/docs/img/Qualidade%20de%20Softwere.png">



## Requisitos de Qualidade

#### Funcionalidade

- **Adequação:** Fornecer uma variedade de funções para organização de guarda-roupa em diferentes dispositivos e plataformas.
- **Acurácia:** Alto grau de precisão na exibição de informações sobre roupas e conjuntos, sincronizando dados entre dispositivos.
- **Interoperabilidade:** Compatibilidade com Android, iOS e plataformas web, garantindo uma experiência consistente em todos os dispositivos.
- **Segurança:** Criptografia de dados pessoais e autenticação do usuário em todos os pontos de acesso da aplicação.
- **Conformidade:** Conformidade com as leis de proteção de dados e outras regulamentações, considerando as diferenças regionais.

#### Usabilidade

- **Inteligibilidade:** Design responsivo e intuitivo para fácil navegação em diferentes tamanhos de tela.
- **Apreensibilidade:** Inclusão de tutoriais ou guias interativos para auxiliar novos usuários em diferentes plataformas.
- **Operabilidade:** Facilidade de uso com controles bem projetados, como filtros e recursos de busca, adaptados para interação via toque ou mouse.
- **Atratividade:** Design visualmente agradável, com uma paleta de cores apropriada e adaptação ao tema do dispositivo (claro/escuro).
- **Conformidade:** Adesão às melhores práticas e padrões da indústria para design de UI/UX em aplicações multiplataforma.

#### Qualidade dos Padrões de Codificação

- **Local Storage:**
  - **Nomeação de Chaves:** Use nomes descritivos e claros para facilitar a compreensão em um contexto distribuído.
  - **Verificação de Existência:** Verifique se a chave já existe no Local Storage antes de tentar recuperar dados, considerando a possibilidade de sincronização entre dispositivos.
  - **Segurança:** Evite armazenar informações sensíveis e considere o uso de mecanismos de armazenamento mais seguros para dados críticos.

- **JSON:**
  - **Indentação:** Mantenha a indentação consistente para facilitar a leitura e manutenção do JSON em um ambiente de desenvolvimento colaborativo.
  - **Nomeação de Atributos:** Use camelCase para nomear atributos, mantendo a consistência em toda a aplicação distribuída.
  - **Validação de JSON:** Certifique-se de que o JSON é válido antes de usá-lo em sua aplicação, especialmente ao receber dados de diferentes fontes.
  - **Tipo de Dados:** Seja consistente com os tipos de dados para garantir a integridade e consistência dos dados em toda a aplicação.

### Considerações Adicionais para Aplicações Distribuídas

- **Escalabilidade:** Garanta que a aplicação possa escalar horizontalmente para lidar com o aumento da carga e do número de usuários.
- **Disponibilidade:** Implemente estratégias para garantir a alta disponibilidade da aplicação, como o uso de balanceadores de carga e replicação de dados.
- **Consistência:** Considere os desafios de consistência de dados em um ambiente distribuído e escolha o modelo de consistência adequado para sua aplicação.

