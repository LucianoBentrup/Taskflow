# TaskFlow — Contexto do Projeto

## O que é

Sistema de gestão de tarefas/projetos (estilo Trello/Linear simplificado),
construído como projeto de portfólio Full Stack. Prioridade 1 do portfólio.

## Stack

- Monorepo: Turborepo + pnpm workspaces
- apps/web: Next.js (App Router), React, TypeScript, TailwindCSS, shadcn/ui,
  TanStack Query, React Hook Form, Zod, Axios, Lucide Icons
- apps/api: Node.js, Express, TypeScript, Prisma ORM, PostgreSQL (Neon/Supabase),
  JWT, Bcrypt, Zod, Cors, Helmet, Morgan, Dotenv
- packages/types: tipos compartilhados entre web e api
- packages/eslint-config, packages/tsconfig: configs compartilhadas

Sempre utilize as versões estáveis mais recentes compatíveis entre si.
Caso exista conflito entre dependências, escolha a combinação oficialmente
recomendada pela documentação de cada ferramenta.

## Estrutura de pastas

apps/web/src: app, components (ui/layout/forms/dashboard/common),
features (auth/users/tasks/projects/dashboard), hooks, services, lib,
providers, types, utils, constants, styles

apps/api/src: config, middlewares, routes, controllers, services,
repositories, dtos, validators, utils, lib, types, errors, app.ts, server.ts

## Entidades iniciais (evitar overengineering)

User, Project, Task, Category — só isso por enquanto.
Comment, Attachment, Notification, ActivityLog vêm depois.
Os models do Prisma são criados na Sprint 1, não antes.

## Princípios

Antes de criar qualquer código:

- reutilize código existente
- evite duplicação
- prefira composição à herança
- mantenha funções pequenas
- mantenha arquivos pequenos
- evite abstrações prematuras
- escreva código legível antes de código "esperto"
- siga Clean Code

## Padrão para Backend

- Controllers: responsáveis apenas por requisição/resposta
- Services: toda a regra de negócio
- Repositories: toda comunicação com o banco
- Routes: apenas mapeamento de rotas
- Nunca colocar regra de negócio em controllers

## Padrão para componentes React

- uma única responsabilidade por componente
- separar lógica em hooks quando necessário
- evitar mais de 200 linhas por componente
- utilizar Server Components quando possível
- utilizar Client Components apenas quando necessário

## Padrão para criação de arquivos

- todo arquivo criado deve ter responsabilidade única
- evite arquivos com mais de 300 linhas
- se ultrapassar esse tamanho, proponha uma divisão antes de continuar

## Convenções

- Somente TypeScript, sem `any`.
- Não ignore erros de TypeScript.
- Commits: Conventional Commits (feat, fix, refactor, style, chore) com escopo,
  ex: feat(auth): create login page
- Branches: main, develop, feature/*
- Aliases de import: @/ tanto no web quanto no api

## Dependências

- Só instalar dependências quando forem realmente necessárias.
- Prefira bibliotecas oficiais e mantidas ativamente.
- Evite bibliotecas abandonadas ou pouco usadas.

## Nunca faça

- Não adicione bibliotecas sem necessidade.
- Não implemente funcionalidades não solicitadas.
- Não altere a arquitetura sem autorização.
- Não remova comentários TODO existentes.
- Não renomeie pastas sem necessidade.
- Não crie código morto.
- Não utilize `any`.
- Não ignore erros de TypeScript.

## Antes de implementar

Sempre explique primeiro:

- o que será alterado
- quais arquivos serão criados
- quais arquivos serão modificados

Depois implemente.

Ao finalizar, informe:

- possíveis melhorias
- próximos passos

## Qualidade — antes de finalizar qualquer tarefa

Rode e garanta que passam sem erro:

- pnpm lint
- pnpm build
- pnpm typecheck

## Status atual

Estamos na Sprint 0 (setup inicial). Ainda NÃO existe autenticação,
CRUD, models do Prisma ou lógica de negócio implementada. Não crie
nada disso ainda a menos que seja explicitamente pedido.
