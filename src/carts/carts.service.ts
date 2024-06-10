import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Cart, Prisma } from '@prisma/client';

@Injectable()
export class CartsService {
  constructor(private prisma: PrismaService) {}

  async createCart(data: Prisma.CartCreateInput): Promise<Cart> {
    return this.prisma.cart.create({ data });
  }

  async getAllCarts(): Promise<Cart[]> {
    return this.prisma.cart.findMany();
  }

  async getCartById(id: number): Promise<Cart> {
    return this.prisma.cart.findUnique({ where: { id } });
  }

  async updateCart(id: number, data: Prisma.CartUpdateInput): Promise<Cart> {
    return this.prisma.cart.update({
      where: { id },
      data,
    });
  }

  async deleteCart(id: number): Promise<Cart> {
    return this.prisma.cart.delete({ where: { id } });
  }
}
