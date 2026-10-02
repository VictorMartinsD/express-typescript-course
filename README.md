<h1 align="center">product-catalog-api</h1>

<div align="center">

[![📘 Notas de Estudo](https://img.shields.io/badge/%F0%9F%93%98%20Notas%20de%20Estudo-Documenta%C3%A7%C3%A3o-0ea5e9?style=for-the-badge)](./docs/study-notes.md)
[![Product Specification](https://img.shields.io/badge/Product%20Specification-Documentation-0ea5e9?style=for-the-badge)](./docs/product-spec.md)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://github.com/VictorMartinsD/product-catalog-api/blob/main/LICENSE)

</div>

<div align="center">

## Sumário | Summary

| Português                                                           | English                                                                       |
| ------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| [Sobre o Projeto](#sobre-o-projeto)                                 | [About the Project](#about-the-project)                                       |
| [Visão de Produto](#visao-de-produto)                               | [Product Vision](#product-vision)                                             |
| [Casos de Uso](#casos-de-uso)                                       | [Use Cases](#use-cases)                                                       |
| [Funcionalidades](#funcionalidades)                                 | [Features](#features)                                                         |
| [Tecnologias](#tecnologias)                                         | [Technologies](#technologies)                                                 |
| [Arquitetura e Decisões Técnicas](#arquitetura-e-decisoes-tecnicas) | [Architecture and Technical Decisions](#architecture-and-technical-decisions) |
| [Como Rodar Localmente](#como-rodar-localmente)                     | [How to Run Locally](#how-to-run-locally)                                     |
| [Limitações Conhecidas](#limitacoes-conhecidas)                     | [Known Limitations](#known-limitations)                                       |
| [Aprendizados](#aprendizados)                                       | [Learnings](#learnings)                                                       |

</div>

<a name="sobre-o-projeto"></a>

## 📌 Sobre o Projeto

`product-catalog-api` é uma API REST para validar e receber dados básicos de produtos. O projeto concentra-se no fluxo inicial de cadastro, com regras explícitas para nome e preço, além de uma consulta inicial baseada em parâmetros de página.

O sistema foi desenvolvido como um backend modular em Node.js e TypeScript, com separação entre entrada HTTP, rotas, processamento e validação. A visão funcional detalhada está em [docs/product-spec.md](./docs/product-spec.md).

<a name="visao-de-produto"></a>

## 🎯 Visão de Produto

O projeto resolve a necessidade de validar e encaminhar dados mínimos de produtos por meio de um contrato de entrada previsível. Seu público principal são desenvolvedores que integram, testam ou estudam um serviço inicial de catálogo.

O valor entregue está na rejeição clara de dados inválidos e na confirmação dos dados aceitos, sem assumir responsabilidades de um catálogo persistente. Para regras de negócio e requisitos detalhados, consulte a [Especificação de Produto](./docs/product-spec.md).

<a name="casos-de-uso"></a>

## 📌 Casos de Uso

- Validar os dados mínimos de um produto antes de integrá-los a outro sistema.
- Testar um fluxo inicial de cadastro de produtos.
- Confirmar como uma API responde a entradas válidas e inválidas.
- Enviar parâmetros de página durante o desenvolvimento de uma futura consulta de catálogo.

<a name="funcionalidades"></a>

## ✨ Funcionalidades

- Recebimento de produtos por `POST /products`.
- Validação de nome e preço no cadastro.
- Retorno dos dados aceitos após uma criação válida.
- Retorno estruturado para erros de validação.
- Consulta de `page` e `limit` por `GET /products`.
- Tratamento padronizado para erros conhecidos e inesperados.

<a name="tecnologias"></a>

## 🛠️ Tecnologias e Ferramentas

### Core

| Tecnologia     | Versão    | Função e impacto na arquitetura                         |
| -------------- | --------- | ------------------------------------------------------- |
| **Node.js**    | Runtime   | Ambiente de execução do servidor HTTP.                  |
| **TypeScript** | `^5.5.4`  | Tipagem estática e verificação rigorosa do código.      |
| **Express**    | `^4.19.2` | Define o servidor, rotas, middlewares e respostas HTTP. |

### Validação

| Tecnologia | Versão    | Função e impacto na arquitetura                                |
| ---------- | --------- | -------------------------------------------------------------- |
| **Zod**    | `^3.23.8` | Valida o corpo das requisições e organiza os erros de entrada. |

### Tooling

| Tecnologia | Versão    | Função e impacto na arquitetura                                                          |
| ---------- | --------- | ---------------------------------------------------------------------------------------- |
| **tsx**    | `^4.16.2` | Executa o entry point TypeScript com recarga no script de desenvolvimento.               |
| **npm**    | Lockfile  | Instala as dependências declaradas e registra versões resolvidas em `package-lock.json`. |

Não há no projeto atual frontend, estilos, hooks, testes automatizados, banco de dados, integração externa ou ferramenta de build de frontend.

<a name="arquitetura-e-decisoes-tecnicas"></a>

## 🏗️ Arquitetura e Decisões Técnicas

O projeto usa uma organização modular por responsabilidade. O arquivo de inicialização registra o processamento JSON, conecta o router principal e centraliza o tratamento de erros. As rotas de produtos encaminham cada operação para o controller correspondente.

```text
product-catalog-api/
├── package.json                 # Metadados, dependências e script de desenvolvimento
├── package-lock.json            # Versões resolvidas das dependências
├── tsconfig.json                # Configuração do compilador TypeScript
├── .gitignore                   # Arquivos locais e gerados ignorados pelo Git
├── docs/
│   ├── product-spec.md          # Visão funcional e regras de produto
│   └── study-notes.md       # Registro técnico de aprendizado
└── src/
    ├── server.ts                # Bootstrap do servidor e tratamento global de erros
    ├── controllers/
    │   └── products-controller.ts # Operações de consulta e criação de produtos
    ├── middleware/
    │   └── my-middleware.ts     # Middleware de contexto da requisição
    ├── routes/
    │   ├── index.ts             # Composição do router principal
    │   └── products-routes.ts   # Rotas do recurso de produtos
    ├── types/
    │   └── request.d.ts         # Extensão do tipo de requisição do Express
    └── utils/
        └── app-error.ts         # Representação de erros da aplicação
```

As principais decisões técnicas são:

- Separar rotas e controllers para manter o bootstrap concentrado na inicialização.
- Aplicar middleware específico antes da criação de produtos para enriquecer o contexto da requisição.
- Estender o tipo de requisição para representar o identificador disponível no controller.
- Centralizar respostas de erro para diferenciar falhas de validação, erros da aplicação e falhas inesperadas.
- Habilitar `strict` e `strictNullChecks` no TypeScript para aumentar a segurança da verificação estática.

<a name="como-rodar-localmente"></a>

## 🚀 Como Rodar o Projeto Localmente

1. Clone o repositório:

```bash
git clone https://github.com/VictorMartinsD/product-catalog-api.git
```

2. Entre no diretório do projeto:

```bash
cd product-catalog-api
```

3. Instale as dependências:

```bash
npm install
```

4. Inicie o servidor em modo de desenvolvimento:

```bash
npm run dev
```

O servidor é iniciado na porta `3333`.

<a name="limitacoes-conhecidas"></a>

## ⚠️ Limitações Conhecidas

- Não possui persistência de dados.
- Não retorna uma lista real de produtos.
- Não possui operações de edição ou remoção.
- Não possui autenticação ou autorização.
- Não possui interface visual.
- Não possui deploy público confirmado.
- Não possui testes automatizados.
- A consulta de página não pagina dados armazenados.

<a name="aprendizados"></a>

## 📚 Aprendizados

O desenvolvimento reforçou a organização de uma API em camadas de entrada, roteamento, middleware e controller, além da validação de dados externos e do tratamento centralizado de falhas. Também consolidou o uso de declaração de tipos para transportar dados adicionados durante o ciclo da requisição.

Os desafios e decisões técnicas estão registrados nas [Notas de Estudo Técnico](./docs/study-notes.md).

— Desenvolvido por [Victor Martins](https://github.com/VictorMartinsD)  
Front-End Developer focado em aplicações web modernas e performance.

---

<div align="center">
<a name="english-version"></a>
## ENGLISH VERSION
</div>

<a name="about-the-project"></a>

## 📌 About the Project

`product-catalog-api` is a REST API for validating and receiving basic product data. The project focuses on the initial registration flow, with explicit rules for product names and prices, as well as an initial query based on page parameters.

The system is a modular Node.js and TypeScript backend that separates HTTP input, routing, processing, and validation. The detailed functional vision is available in [docs/product-spec.md](./docs/product-spec.md).

<a name="product-vision"></a>

## 🎯 Product Vision

The project addresses the need to validate and submit minimum product data through a predictable input contract. Its primary audience is developers integrating, testing, or studying an initial catalog service.

The delivered value is clear rejection of invalid data and confirmation of accepted data, without assuming the responsibilities of a persistent catalog. For detailed business rules and requirements, access the [Product Specification](./docs/product-spec.md).

<a name="use-cases"></a>

## 📌 Use Cases

- Validate minimum product data before integrating it with another system.
- Test an initial product-registration flow.
- Confirm how an API responds to valid and invalid input.
- Submit page parameters while developing a future catalog query.

<a name="features"></a>

## ✨ Features

- Receive products through `POST /products`.
- Validate product names and prices during registration.
- Return accepted data after a valid creation request.
- Return structured validation errors.
- Query `page` and `limit` through `GET /products`.
- Apply standardized handling for known and unexpected errors.

<a name="technologies"></a>

## 🛠️ Technologies and Tools

### Core

| Technology     | Version   | Role and architectural impact                               |
| -------------- | --------- | ----------------------------------------------------------- |
| **Node.js**    | Runtime   | Execution environment for the HTTP server.                  |
| **TypeScript** | `^5.5.4`  | Static typing and strict code checking.                     |
| **Express**    | `^4.19.2` | Defines the server, routes, middleware, and HTTP responses. |

### Validation

| Technology | Version   | Role and architectural impact                        |
| ---------- | --------- | ---------------------------------------------------- |
| **Zod**    | `^3.23.8` | Validates request bodies and organizes input errors. |

### Tooling

| Technology | Version   | Role and architectural impact                                                        |
| ---------- | --------- | ------------------------------------------------------------------------------------ |
| **tsx**    | `^4.16.2` | Runs the TypeScript entry point with reloads in development.                         |
| **npm**    | Lockfile  | Installs declared dependencies and records resolved versions in `package-lock.json`. |

The current project has no frontend, styles, hooks, automated tests, database, external integration, or frontend build tool.

<a name="architecture-and-technical-decisions"></a>

## 🏗️ Architecture and Technical Decisions

The project uses a responsibility-based modular organization. The entry point registers JSON processing, connects the main router, and centralizes error handling. Product routes forward each operation to the corresponding controller.

```text
product-catalog-api/
├── package.json                 # Metadata, dependencies, and development script
├── package-lock.json            # Resolved dependency versions
├── tsconfig.json                # TypeScript compiler configuration
├── .gitignore                   # Local and generated files ignored by Git
├── docs/
│   ├── product-spec.md          # Product vision and business rules
│   └── study-notes.md       # Technical learning record
└── src/
    ├── server.ts                # Server bootstrap and global error handling
    ├── controllers/
    │   └── products-controller.ts # Product query and creation operations
    ├── middleware/
    │   └── my-middleware.ts     # Request context middleware
    ├── routes/
    │   ├── index.ts             # Main router composition
    │   └── products-routes.ts   # Product resource routes
    ├── types/
    │   └── request.d.ts         # Express request type extension
    └── utils/
        └── app-error.ts         # Application error representation
```

The main technical decisions are:

- Separate routes and controllers to keep the bootstrap focused on initialization.
- Apply route-specific middleware before product creation to enrich request context.
- Extend the request type to represent the identifier available to the controller.
- Centralize error responses to distinguish validation failures, application errors, and unexpected failures.
- Enable `strict` and `strictNullChecks` in TypeScript to increase static-checking safety.

<a name="how-to-run-locally"></a>

## 🚀 How to Run the Project Locally

1. Clone the repository:

```bash
git clone https://github.com/VictorMartinsD/product-catalog-api.git
```

2. Enter the project directory:

```bash
cd product-catalog-api
```

3. Install the dependencies:

```bash
npm install
```

4. Start the development server:

```bash
npm run dev
```

The server starts on port `3333`.

<a name="known-limitations"></a>

## ⚠️ Known Limitations

- No data persistence.
- No real product list response.
- No edit or delete operations.
- No authentication or authorization.
- No visual interface.
- No confirmed public deployment.
- No automated tests.
- The page query does not paginate stored data.

<a name="learnings"></a>

## 📚 Learnings

The development reinforced how to organize an API into input, routing, middleware, and controller layers, as well as how to validate external data and centralize failure handling. It also consolidated the use of type declarations for values added during the request lifecycle.

The technical challenges and decisions are recorded in the [Technical Study Notes](./docs/study-notes.md).

— Developed by [Victor Martins](https://github.com/VictorMartinsD)  
Front-End Developer focused on modern web applications and performance.
