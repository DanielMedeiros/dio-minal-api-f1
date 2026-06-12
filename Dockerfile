# Estágio 1: Build (Compilação do TypeScript)
FROM node:20-alpine AS builder

WORKDIR /usr/src/app

# Copia os arquivos de dependência
COPY package*.json ./

# Instala TODAS as dependências (necessário para o tsc)
RUN npm ci

# Copia o restante do código fonte
COPY . .

# Compila o projeto (gera a pasta /dist)
RUN npm run build


# Estágio 2: Produção (Imagem final otimizada)
FROM node:20-alpine

WORKDIR /usr/src/app

# Copia apenas o package.json e package-lock.json
COPY package*.json ./

# Instala APENAS as dependências de produção (ignora devDependencies)
RUN npm ci --omit=dev

# Copia a pasta dist gerada no Estágio 1
COPY --from=builder /usr/src/app/dist ./dist

# Configura variáveis de ambiente padrão
ENV NODE_ENV=production
ENV PORT=3333

# Expõe a porta que o Fastify vai usar
EXPOSE 3333

# Executa o servidor compilado
CMD ["node", "dist/server.js"]