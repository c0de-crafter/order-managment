import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { OrderStatus, Prisma } from '@prisma/client';

@Injectable()
export class OrderStatusService {
  constructor(private prisma: PrismaService) {}

  async createOrderStatus(
    data: Prisma.OrderStatusCreateInput,
  ): Promise<OrderStatus> {
    return this.prisma.orderStatus.create({ data });
  }

  async getAllOrderStatuses(): Promise<OrderStatus[]> {
    return this.prisma.orderStatus.findMany();
  }

  async getOrderStatusById(id: number): Promise<OrderStatus> {
    return this.prisma.orderStatus.findUnique({ where: { id } });
  }

  async updateOrderStatus(
    id: number,
    data: Prisma.OrderStatusUpdateInput,
  ): Promise<OrderStatus> {
    return this.prisma.orderStatus.update({
      where: { id },
      data,
    });
  }

  async deleteOrderStatus(id: number): Promise<OrderStatus> {
    return this.prisma.orderStatus.delete({ where: { id } });
  }
}
