import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('skylineGTR48', 10);
  
  const admin = await prisma.adminUser.upsert({
    where: { email: 'belal.bou.pro@gmail.com' },
    update: {},
    create: {
      email: 'belal.bou.pro@gmail.com',
      password: hashedPassword,
    },
  });

  console.log({ admin });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 