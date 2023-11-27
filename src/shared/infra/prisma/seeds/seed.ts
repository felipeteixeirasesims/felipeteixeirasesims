import { PrismaClient } from '@prisma/client';
import RoleSeed from './RoleSeed';
import UserSeed from './UserSeed';
const prisma = new PrismaClient();

const load = async () => {
  try {
    const allRoles = prisma.role.findMany({});
    if ((await allRoles).length === 0) {
      const c = await prisma.role.createMany({
        data: RoleSeed
      });
    }

    const allUsers = prisma.user.findMany({});
    if ((await allUsers).length === 0) {
      const c = await prisma.user.createMany({
        data: UserSeed
      });
    }
  } catch (e) {
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
};

load();
