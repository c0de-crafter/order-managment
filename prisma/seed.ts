import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // Verificar y/o crear estados de pedidos
  const statuses = [
    'IN_CART',
    'PAID',
    'AWAITING_ARRIVAL',
    'ARRIVED',
    'DELIVERED',
  ];
  const statusIds = {};

  for (const status of statuses) {
    const statusRecord = await prisma.orderStatus.upsert({
      where: { name: status },
      update: {},
      create: { name: status },
    });
    statusIds[status] = statusRecord.id;
  }

  // Crear proveedores con el campo website
  const suppliers = [
    { name: 'Temu', website: 'http://temu.com' },
    { name: 'Shein', website: 'http://shein.com' },
  ];

  const supplierRecords = await Promise.all(
    suppliers.map(async (supplier) => {
      const existingSupplier = await prisma.supplier.findFirst({
        where: { name: supplier.name },
      });
      if (existingSupplier) {
        return existingSupplier;
      } else {
        return prisma.supplier.create({
          data: supplier,
        });
      }
    }),
  );

  const supplierIds = supplierRecords.reduce((acc, supplier) => {
    acc[supplier.name] = supplier.id;
    return acc;
  }, {});

  // Crear usuarios con contraseñas cifradas
  const users = await Promise.all(
    Array.from({ length: 5 }).map(async (_, i) => {
      const passwordHash = await bcrypt.hash(`password123`, 10);
      return prisma.user.upsert({
        where: { email: `user${i + 1}@example.com` },
        update: {},
        create: {
          email: `user${i + 1}@example.com`,
          password: passwordHash,
          profile: {
            create: {
              name: `User ${i + 1}`,
            },
          },
        },
      });
    }),
  );

  // Crear un carrito para esta semana
  const now = new Date();
  const startDate = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() - now.getDay(),
  );
  const endDate = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() - now.getDay() + 6,
  );

  const cart1 = await prisma.cart.create({
    data: {
      startDate,
      endDate,
    },
  });

  // Crear pedidos con referencia al estado y proveedor
  await prisma.order.create({
    data: {
      user: {
        connect: { id: users[0].id },
      },
      productLink: 'http://example.com/product1',
      details: { color: 'red', size: 'M' },
      supplier: {
        connect: { id: supplierIds['Temu'] },
      },
      status: {
        connect: { id: statusIds['IN_CART'] },
      },
      cart: {
        connect: { id: cart1.id },
      },
      code: 'ABC123',
    },
  });

  await prisma.order.create({
    data: {
      user: {
        connect: { id: users[1].id },
      },
      productLink: 'http://example.com/product2',
      details: { color: 'blue', size: 'L' },
      supplier: {
        connect: { id: supplierIds['Shein'] },
      },
      status: {
        connect: { id: statusIds['PAID'] },
      },
      code: 'XYZ456',
    },
  });

  await prisma.order.create({
    data: {
      user: {
        connect: { id: users[2].id },
      },
      productLink: 'http://example.com/product3',
      details: { color: 'green', size: 'S' },
      supplier: {
        connect: { id: supplierIds['Temu'] },
      },
      status: {
        connect: { id: statusIds['AWAITING_ARRIVAL'] },
      },
      purchaseCost: 80.0,
      saleCost: 120.0,
      cart: {
        connect: { id: cart1.id },
      },
      code: 'DEF789',
    },
  });

  await prisma.order.create({
    data: {
      user: {
        connect: { id: users[3].id },
      },
      productLink: 'http://example.com/product4',
      details: { color: 'yellow', size: 'XL' },
      supplier: {
        connect: { id: supplierIds['Shein'] },
      },
      status: {
        connect: { id: statusIds['ARRIVED'] },
      },
      purchaseCost: 90.0,
      saleCost: 130.0,
      code: 'GHI012',
    },
  });

  await prisma.order.create({
    data: {
      user: {
        connect: { id: users[4].id },
      },
      productLink: 'http://example.com/product5',
      details: { color: 'black', size: 'XXL' },
      supplier: {
        connect: { id: supplierIds['Temu'] },
      },
      status: {
        connect: { id: statusIds['DELIVERED'] },
      },
      purchaseCost: 100.0,
      saleCost: 150.0,
      code: 'JKL345',
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
