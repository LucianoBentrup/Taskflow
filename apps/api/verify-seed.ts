// Verify seed data is present and test data is gone
import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function verify() {
  try {
    console.log('=== VERIFICAÇÃO DO BANCO DE DADOS ===\n');

    // Users
    const users = await prisma.user.findMany({
      select: { id: true, name: true, email: true },
    });
    console.log(`✅ Usuários (${users.length}):`);
    users.forEach((u) => console.log(`   - ${u.name} (${u.email})`));

    // Projects
    const projects = await prisma.project.findMany({
      select: { id: true, name: true, description: true, owner: { select: { name: true } } },
    });
    console.log(`\n✅ Projetos (${projects.length}):`);
    projects.forEach((p) => console.log(`   - ${p.name} (Owner: ${p.owner?.name || 'N/A'})`));

    // Categories
    const categories = await prisma.category.findMany({
      select: { id: true, name: true },
    });
    console.log(`\n✅ Categorias (${categories.length}):`);
    categories.forEach((c) => console.log(`   - ${c.name}`));

    // Tasks
    const tasks = await prisma.task.findMany({
      select: {
        id: true,
        title: true,
        status: true,
        priority: true,
        project: { select: { name: true } },
      },
    });
    console.log(`\n✅ Tarefas (${tasks.length}):`);
    tasks.forEach((t) =>
      console.log(
        `   - [${t.status}] ${t.title} (${t.project?.name || 'N/A'}) - Prioridade: ${t.priority}`,
      ),
    );

    console.log('\n=== RESULTADO ===');
    if (
      users.length === 2 &&
      projects.length === 2 &&
      categories.length === 3 &&
      tasks.length === 5
    ) {
      console.log('✅ BANCO LIMPO E SEED APLICADO COM SUCESSO!');
      console.log('   - 2 usuários (Alice, Bob)');
      console.log('   - 2 projetos (Redesign do Site, App Mobile)');
      console.log('   - 3 categorias (Bug, Feature, Urgente)');
      console.log('   - 5 tarefas distribuídas');
    } else {
      console.log('⚠️ BANCO NÃO ESTÁ CONFORME ESPERADO!');
      console.log(`   Esperado: 2 users, 2 projects, 3 categories, 5 tasks`);
      console.log(
        `   Encontrado: ${users.length} users, ${projects.length} projects, ${categories.length} categories, ${tasks.length} tasks`,
      );
    }
  } catch (error) {
    console.error('❌ Erro ao verificar banco:', error);
  } finally {
    await prisma.$disconnect();
  }
}

verify();
