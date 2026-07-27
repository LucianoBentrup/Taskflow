// Script de seed do banco de dados com dados de teste mínimos.
import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import bcrypt from 'bcrypt';

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
  const passwordHash = await bcrypt.hash('password123', 10);

  const owner = await prisma.user.upsert({
    where: { email: 'alice@taskflow.dev' },
    update: {},
    create: { name: 'Alice Silva', email: 'alice@taskflow.dev', password: passwordHash },
  });

  const bob = await prisma.user.upsert({
    where: { email: 'bob@taskflow.dev' },
    update: {},
    create: { name: 'Bob Souza', email: 'bob@taskflow.dev', password: passwordHash },
  });

  const [bugCategory, featureCategory, urgentCategory] = await Promise.all([
    prisma.category.create({ data: { name: 'Bug', color: '#ef4444' } }),
    prisma.category.create({ data: { name: 'Feature', color: '#3b82f6' } }),
    prisma.category.create({ data: { name: 'Urgente', color: '#f97316' } }),
  ]);

  const website = await prisma.project.create({
    data: { name: 'Redesign do Site', description: 'Novo layout institucional', ownerId: owner.id },
  });

  const mobileApp = await prisma.project.create({
    data: {
      name: 'App Mobile',
      description: 'Aplicativo de tarefas para iOS/Android',
      ownerId: bob.id,
    },
  });

  await prisma.task.createMany({
    data: [
      {
        title: 'Corrigir bug no login',
        description: 'Usuário não consegue autenticar com email maiúsculo',
        status: 'TODO',
        priority: 'HIGH',
        projectId: website.id,
        categoryId: bugCategory.id,
      },
      {
        title: 'Criar tela de onboarding',
        description: 'Fluxo inicial para novos usuários',
        status: 'IN_PROGRESS',
        priority: 'MEDIUM',
        projectId: website.id,
        categoryId: featureCategory.id,
      },
      {
        title: 'Ajustar responsividade do header',
        status: 'DONE',
        priority: 'LOW',
        projectId: website.id,
      },
      {
        title: 'Configurar push notifications',
        description: 'Notificações de novas tarefas',
        status: 'TODO',
        priority: 'MEDIUM',
        projectId: mobileApp.id,
        categoryId: featureCategory.id,
      },
      {
        title: 'Corrigir crash na tela de tarefas',
        status: 'TODO',
        priority: 'HIGH',
        projectId: mobileApp.id,
        categoryId: urgentCategory.id,
      },
    ],
  });
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
