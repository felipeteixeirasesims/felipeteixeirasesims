import { PrismaClient } from '@prisma/client';
import RoleSeed from './RoleSeed';
const prisma = new PrismaClient();

const load = async () => {
  try {
    const allRoles = prisma.role.findMany({});
    if ((await allRoles).length === 0) {
      const c = await prisma.role.createMany({
        data: RoleSeed
      });
    }
  }catch (e) {
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
};

load();
