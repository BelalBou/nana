import { PrismaClient } from '../generated/prisma';
import * as bcrypt from 'bcrypt';

async function main() {
  const prisma = new PrismaClient();
  const email = 'belal.bou.pro@gmail.com';
  const password = 'skylineGTR48';

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.adminUser.create({
      data: {
        email,
        password: hashedPassword,
      },
    });
    console.log('Admin user created successfully:', { id: user.id, email: user.email });
  } catch (error) {
    console.error('Error creating admin user:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main(); 