# 🏁 F1 Minimal API - Temporada 2026

Minimal API desenvolvida com Node.js, Fastify e TypeScript para retornar a lista projetada de pilotos e equipas da Fórmula 1 para o ano de 2026. O projeto foi construído focando em alta performance e manutenibilidade através da **Clean Architecture**, integridade com **ESLint**, validação contínua por **Testes Unitários** e documentação automatizada com **Swagger**.

## 🚀 Tecnologias

- **Node.js**
- **Fastify** (Framework web de alta performance)
- **TypeScript**
- **Swagger & Swagger UI** (Documentação interativa da API)
- **ESLint** (Padronização e qualidade de código)
- **Vitest** (Framework de testes unitários de alta velocidade)
- **@fastify/cors** (Configuração de CORS)
- **@fastify/helmet** (Segurança de cabeçalhos HTTP)
- **Docker & Docker Compose** (Containerização com multi-stage build)
- **GitHub Actions** (CI/CD)

## 🏗 Arquitetura (Clean Architecture)

A estrutura do projeto foi pensada para desacoplar a regra de negócios do framework de entrega:

- `domain/`: Contém as entidades e regras centrais (neste caso, os Enums com os dados de 2026).
- `application/`: Casos de uso (`GetDriversUseCase`, `GetTeamsUseCase`).
- `presentation/`: Controladores, Rotas e Esquemas de validação, lidando estritamente com as requisições HTTP via Fastify.

## ⚙️ Funcionalidades e Endpoints

A API expõe os seus recursos com o prefixo `/api/v1`.

- `GET /api/v1/drivers` : Retorna a lista de pilotos projetados para 2026.
- `GET /api/v1/drivers/:name` : Pesquisa um piloto específico pelo nome.
- `GET /api/v1/teams` : Retorna a lista de construtores/equipas para 2026.
- `GET /docs` : Interface interativa do Swagger para exploração e testes dos endpoints.

## 🛡️ Segurança, Qualidade e Testes

- **Documentação viva:** Swagger UI integrado para validação visual rápida dos contratos da API.
- **Testes Unitários:** Validação isolada dos Casos de Uso com Vitest, garantindo o funcionamento das regras de negócio.
- **Análise Estática:** Uso do ESLint para garantir a conformidade com as diretrizes de _Clean Code_.
- **Helmet:** Proteção contra vulnerabilidades comuns da web através do gerenciamento de cabeçalhos HTTP.
- **CORS:** Configuração estrita para prevenir acessos não autorizados de origens cruzadas.
- **Pipeline de CI/CD:** Integração contínua via GitHub Actions que valida o Lint, executa a suíte de testes e valida o Build a cada commit/pull request.

## 🛠️ Como executar localmente

Você pode rodar este projeto utilizando o Node.js diretamente ou via Docker.

### Opção 1: Usando Node.js (Ambiente de Desenvolvimento)

1. Clone este repositório:
   ```bash
   git clone [https://github.com/SEU-USUARIO/f1-minimal-api.git](https://github.com/SEU-USUARIO/f1-minimal-api.git)
   ```
