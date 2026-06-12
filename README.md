# 🏁 F1 Minimal API - Temporada 2026

Minimal API desenvolvida com Node.js, Fastify e TypeScript para retornar a lista projetada de pilotos e equipes da Fórmula 1 para o ano de 2026. O projeto foi construído focando em alta performance e manutenibilidade através da **Clean Architecture** e integridade de código com **ESLint**.

## 🚀 Tecnologias

- **Node.js**
- **Fastify** (Framework web de alta performance)
- **TypeScript**
- **ESLint** (Padronização e qualidade de código)
- **@fastify/cors** (Configuração de CORS)
- **@fastify/helmet** (Segurança de cabeçalhos HTTP)
- **Docker & Docker Compose** (Containerização com multi-stage build)
- **GitHub Actions** (CI/CD)

## 🏗 Arquitetura (Clean Architecture)

A estrutura do projeto foi pensada para desacoplar a regra de negócios do framework de entrega:

- `domain/`: Contém as entidades e regras centrais (neste caso, os Enums com os dados de 2026).
- `application/`: Casos de uso (`GetDriversUseCase`, `GetTeamsUseCase`).
- `presentation/`: Controladores e Rotas, lidando estritamente com as requisições HTTP via Fastify.

## ⚙️ Funcionalidades e Endpoints

A API expõe seus recursos com o prefixo `/api/v1`.

- `GET /api/v1/drivers` : Retorna a lista de pilotos projetados para 2026.
- `GET /api/v1/teams` : Retorna a lista de construtores/equipes para 2026.

## 🛡️ Segurança e Qualidade de Código

- **Análise Estática:** Uso do ESLint para garantir a conformidade com as diretrizes de _Clean Code_.
- **Helmet:** Proteção contra vulnerabilidades comuns da web através do gerenciamento de cabeçalhos HTTP.
- **CORS:** Configuração estrita para prevenir acessos não autorizados de origens cruzadas.
- **Pipeline de CI/CD:** Integração contínua via GitHub Actions que valida o Lint e o Build a cada commit/pull request.

## 🛠️ Como executar localmente

Você pode rodar este projeto de duas formas: utilizando o Node.js diretamente ou via Docker.

### Opção 1: Usando Node.js (Ambiente de Desenvolvimento)

1. Clone este repositório:
   ```bash
   git clone [https://github.com/SEU-USUARIO/f1-minimal-api.git](https://github.com/SEU-USUARIO/f1-minimal-api.git)
   ```
