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

- Web: http://localhost:3000
- API: http://localhost:3001 (health check em `/health`)
