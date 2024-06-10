import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Supplier, Prisma } from '@prisma/client';

@Injectable()
export class SuppliersService {
  constructor(private prisma: PrismaService) {}

  async createSupplier(data: Prisma.SupplierCreateInput): Promise<Supplier> {
    return this.prisma.supplier.create({ data });
  }

  async getAllSuppliers(): Promise<Supplier[]> {
    return this.prisma.supplier.findMany();
  }

  async getSupplierById(id: number): Promise<Supplier> {
    return this.prisma.supplier.findUnique({ where: { id } });
  }

  async updateSupplier(
    id: number,
    data: Prisma.SupplierUpdateInput,
  ): Promise<Supplier> {
    return this.prisma.supplier.update({
      where: { id },
      data,
    });
  }

  async deleteSupplier(id: number): Promise<Supplier> {
    return this.prisma.supplier.delete({ where: { id } });
  }
}
