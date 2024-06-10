import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Order } from '@prisma/client';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}

  async createOrder(data: {
    userId: number;
    productLink: string;
    details: any;
    supplierId: number;
    statusId: number;
    code?: string;
  }): Promise<Order> {
    const { userId, supplierId, statusId, ...rest } = data;
    return this.prisma.order.create({
      data: {
        ...rest,
        user: { connect: { id: userId } },
        supplier: { connect: { id: supplierId } },
        status: { connect: { id: statusId } },
      },
    });
  }

  async getOrdersByUserId(userId: number): Promise<Order[]> {
    return this.prisma.order.findMany({ where: { userId } });
  }

  async findAllOrders(): Promise<Order[]> {
    return this.prisma.order.findMany();
  }

  async updateOrderStatus(orderId: number, statusId: number): Promise<Order> {
    return this.prisma.order.update({
      where: { id: orderId },
      data: { status: { connect: { id: statusId } } },
    });
  }

  async updateOrder(id: number, data: any): Promise<Order> {
    return this.prisma.order.update({
      where: { id },
      data,
    });
  }

  async deleteOrder(id: number): Promise<Order> {
    return this.prisma.order.delete({ where: { id } });
  }
}
