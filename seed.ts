import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // Seed Suppliers (Shein and Temu)
  const shein = await prisma.supplier.create({
    data: {
      name: 'Shein',
    },
  });

  const temu = await prisma.supplier.create({
    data: {
      name: 'Temu',
    },
  });

  // Seed Users and Profiles
  const hashedPassword1 = await bcrypt.hash('password123', 10);
  const user1 = await prisma.user.create({
    data: {
      email: 'user1@example.com',
      password: hashedPassword1,
      profile: {
        create: {
          name: 'User One',
        },
      },
    },
  });

  const hashedPassword2 = await bcrypt.hash('password456', 10);
  const user2 = await prisma.user.create({
    data: {
      email: 'user2@example.com',
      password: hashedPassword2,
      profile: {
        create: {
          name: 'User Two',
        },
      },
    },
  });

  // Seed Orders
  const order1 = await prisma.order.create({
    data: {
      user: { connect: { id: user1.id } },
      supplier: { connect: { id: shein.id } },
      productLink: 'http://example.com/product1',
      details: 'Order details for product 1',
      status: 'pending',
    },
  });

  const order2 = await prisma.order.create({
    data: {
      user: { connect: { id: user2.id } },
      supplier: { connect: { id: temu.id } },
      productLink: 'http://example.com/product2',
      details: 'Order details for product 2',
      status: 'shipped',
    },
  });

  console.log('Seed data created.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
