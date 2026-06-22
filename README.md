# 🏁 F1 Minimal API - Temporada 2026

Minimal API desenvolvida com Node.js, Fastify e TypeScript para retornar a lista projetada de pilotos e equipas da Fórmula 1 para o ano de 2026. O projeto foi construído focando em alta performance e manutenibilidade através da **Clean Architecture**, integridade com **ESLint**, validação contínua por **Testes Unitários** e documentação automatizada com **Swagger**.

O projeto também conta com um **Dashboard Front-End integrado**, servido diretamente pelo próprio servidor Fastify, com design premium em tema escuro inspirado na Fórmula 1.

## 🚀 Tecnologias

### Backend
- **Node.js**
- **Fastify** (Framework web de alta performance)
- **TypeScript**
- **Swagger & Swagger UI** (Documentação interativa da API)
- **ESLint** (Padronização e qualidade de código)
- **Jest** (Framework de testes unitários de alta velocidade)
- **@fastify/cors** (Configuração de CORS)
- **@fastify/helmet** (Segurança de cabeçalhos HTTP)
- **@fastify/static** (Servir arquivos estáticos do front-end)
- **Docker & Docker Compose** (Containerização com multi-stage build)
- **GitHub Actions** (CI/CD)

### Front-End (Dashboard Integrado)
- **HTML5** (Semântico e acessível)
- **CSS3 Vanilla** (Design System com variáveis, glassmorphism, animações)
- **JavaScript Vanilla** (Fetch API, DOM dinâmico, tratamento de erros)
- **Google Fonts – Outfit** (Tipografia moderna)

## 🖥️ Dashboard Front-End

O projeto inclui um dashboard visual interativo servido diretamente pelo Fastify na raiz `/`. Não é necessário nenhum servidor adicional.

### Funcionalidades do Dashboard:
- 🔍 **Busca de Pilotos** por nome completo (ex: `Lewis Hamilton`)
- 🔍 **Busca de Equipes** por nome completo (ex: `McLaren F1 Team`)
- 📋 **Listar todos os pilotos** da temporada 2026
- 📋 **Listar todas as equipes** da temporada 2026
- 🎨 **Branding dinâmico** — cada card exibe a cor oficial da equipe correspondente
- ⚠️ **Tratamento de erros** — mensagens amigáveis para buscas sem resultado
- 📱 **Responsivo** — funciona em desktop, tablet e mobile

### Como acessar:
| Recurso | URL |
|---------|-----|
| **Dashboard** | http://localhost:3000/ |
| **Swagger UI** | http://localhost:3000/docs |
| **API REST** | http://localhost:3000/api/v1 |

> **Atenção:** A busca por piloto/equipe requer o **nome completo** conforme cadastrado na temporada 2026.
> Exemplo correto: `Lewis Hamilton`, `McLaren F1 Team`.

## 🏗 Arquitetura (Clean Architecture)

A estrutura do projeto foi pensada para desacoplar a regra de negócios do framework de entrega:

```
src/
├── domain/           # Entidades e regras centrais (Enums com dados de 2026)
├── application/      # Casos de Uso (GetDriversUseCase, GetTeamsUseCase, ...)
└── presentation/     # Controladores, Rotas e Esquemas HTTP (Fastify)

public/               # Front-End integrado (servido pelo @fastify/static)
├── index.html        # Estrutura da interface
├── style.css         # Design System (tema dark premium)
└── app.js            # Lógica de consumo da API e renderização dinâmica
```

## ⚙️ Funcionalidades e Endpoints

A API expõe os seus recursos com o prefixo `/api/v1`.

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| `GET` | `/api/v1/drivers` | Retorna a lista de pilotos projetados para 2026 |
| `GET` | `/api/v1/drivers/:name` | Pesquisa um piloto específico pelo nome completo |
| `GET` | `/api/v1/teams` | Retorna a lista de construtores/equipas para 2026 |
| `GET` | `/api/v1/teams/:name` | Pesquisa uma equipe específica pelo nome completo |
| `GET` | `/docs` | Interface interativa do Swagger |
| `GET` | `/` | Dashboard Front-End integrado |

## 🛡️ Segurança, Qualidade e Testes

- **Documentação viva:** Swagger UI integrado para validação visual rápida dos contratos da API.
- **Testes Unitários:** Validação isolada dos Casos de Uso com Jest, garantindo o funcionamento das regras de negócio.
- **Análise Estática:** Uso do ESLint para garantir a conformidade com as diretrizes de _Clean Code_.
- **Helmet:** Proteção contra vulnerabilidades comuns da web através do gerenciamento de cabeçalhos HTTP (com CSP ajustado para suporte ao front-end e Google Fonts).
- **CORS:** Configuração estrita para prevenir acessos não autorizados de origens cruzadas.
- **Pipeline de CI/CD:** Integração contínua via GitHub Actions que valida o Lint, executa a suíte de testes e valida o Build a cada commit/pull request.

## 🛠️ Como executar localmente

Você pode rodar este projeto utilizando o Node.js diretamente ou via Docker. O front-end já é servido automaticamente em ambas as formas.

### Opção 1: Usando Node.js (Desenvolvimento com Hot-Reload)

```bash
# 1. Clone o repositório
git clone https://github.com/SEU-USUARIO/f1-minimal-api.git
cd f1-minimal-api

# 2. Instale as dependências
npm install

# 3. Inicie o servidor de desenvolvimento (backend + frontend juntos)
npm run dev
```

Acesse em: **http://localhost:3000/**

### Opção 2: Usando Node.js (Build de Produção)

```bash
# 1. Instale as dependências
npm install

# 2. Compile o TypeScript
npm run build

# 3. Inicie o servidor de produção
npm run start
```

### Opção 3: Usando Docker

```bash
docker-compose up --build
```

## 🧪 Testes e Qualidade

```bash
# Executar testes unitários
npm run test

# Verificar qualidade do código (linter)
npm run lint

# Corrigir formatação automaticamente
npm run lint:fix
```
