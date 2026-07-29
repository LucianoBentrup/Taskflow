# TaskFlow

Sistema de gestão de tarefas/projetos (estilo Trello/Linear simplificado),
construído como projeto de portfólio Full Stack.

> Status atual: Sprint 0 (setup inicial). Ainda não existem autenticação,
> CRUD, models do Prisma ou lógica de negócio implementados.

## Stack

- **Monorepo**: Turborepo + pnpm workspaces
- **apps/web**: Next.js (App Router), React, TypeScript, TailwindCSS,
  shadcn/ui, TanStack Query, React Hook Form, Zod, Axios, Lucide Icons
- **apps/api**: Node.js, Express, TypeScript, Prisma ORM, PostgreSQL
  (Neon/Supabase), JWT, Bcrypt, Zod, Cors, Helmet, Morgan, Dotenv
- **packages/types**: tipos compartilhados entre web e api
- **packages/eslint-config**, **packages/tsconfig**: configs compartilhadas

## Estrutura do monorepo

```
apps/
  web/    → Next.js (frontend)
  api/    → Express (backend)
packages/
  types/          → tipos compartilhados
  eslint-config/  → configuração de lint compartilhada
  tsconfig/       → configurações de TypeScript compartilhadas
```

## Como rodar o projeto

### Pré-requisitos

- Node.js LTS
- pnpm `^11.17.0`
- Um banco PostgreSQL (ex: Neon ou Supabase)

### Instalação

```bash
pnpm install
```

### Variáveis de ambiente

Copie os arquivos de exemplo e preencha os valores necessários:

```bash
cp apps/web/.env.example apps/web/.env.local
cp apps/api/.env.example apps/api/.env
```

Em `apps/api/.env`, defina `DATABASE_URL` com a connection string do seu
banco PostgreSQL e `JWT_SECRET` com um valor seguro.

### Scripts (via Turborepo)

```bash
pnpm dev        # sobe web e api em modo desenvolvimento
pnpm build      # build de todos os apps/pacotes
pnpm lint       # lint em todo o monorepo
pnpm format     # formata o código com Prettier
pnpm typecheck  # checagem de tipos em todo o monorepo
pnpm seed       # roda o script de seed do banco (apps/api)
```

Local URLs:

- Web: http://localhost:3000
- API: http://localhost:3001 (health check em `/health`)

## Deploy

Este é um Turborepo com dois aplicativos independentes:

### Frontend (Vercel)

**Root Directory**: `apps/web`

Variáveis de ambiente necessárias:

- `NEXT_PUBLIC_API_URL`: URL da API em produção (ex: `https://api.taskflow.example.com`)
- `NEXT_PUBLIC_APP_NAME`: Nome da aplicação
- `NEXT_PUBLIC_APP_VERSION`: Versão da aplicação

**Passos:**

1. Push do código para GitHub
2. No painel do Vercel, criar novo projeto
3. Selecionar este repositório e configurar root directory como `apps/web`
4. Definir variáveis de ambiente (veja [apps/web/.env.example](./apps/web/.env.example))
5. Deploy automático em cada push para `main`

### Backend (Render)

**Root Directory**: `apps/api`

Variáveis de ambiente necessárias:

- `NODE_ENV`: `production`
- `PORT`: `3001` (Render atribui automaticamente, mas pode ser definido)
- `DATABASE_URL`: PostgreSQL connection string (ex: Neon, Supabase, Railway)
- `JWT_SECRET`: Chave secreta para access tokens (gere com openssl: `openssl rand -hex 32`)
- `JWT_REFRESH_SECRET`: Chave secreta para refresh tokens (gere com openssl: `openssl rand -hex 32`)
- `CORS_ORIGIN`: URL do frontend em produção (ex: `https://taskflow.example.com`)
- `BCRYPT_SALT`: Número de rounds para hash de senha (default: `10`)

**Passos:**

1. Push do código para GitHub
2. No painel do Render, criar novo Web Service
3. Conectar repositório GitHub
4. Configurar:
   - **Name**: TaskFlow API
   - **Root Directory**: `apps/api`
   - **Build Command**: `pnpm --filter api build`
   - **Start Command**: `node dist/server.js`
5. Definir variáveis de ambiente (veja [apps/api/.env.example](./apps/api/.env.example))
6. Ao criar o banco de dados, rodar migrations (Render pode fazer isso no deploy)
7. Deploy automático em cada push para `main`

### Validação pré-deploy

Antes de fazer deploy, garanta que os builds isolados funcionam:

```bash
pnpm --filter web build   # Frontend build
pnpm --filter api build   # Backend build
pnpm lint                 # Linter
pnpm typecheck            # TypeScript
```

### Aplicação publicada

- **Web**: [URL AQUI]
- **API**: [API URL AQUI]
