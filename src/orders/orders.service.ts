import { Injectable, BadRequestException } from '@nestjs/common';
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
    purchaseCost?: number;
    saleCost?: number;
    cartId?: number;
  }): Promise<Order> {
    const { userId, supplierId, statusId, cartId, ...rest } = data;

    if (
      statusId === (await this.getPaidStatusId()) &&
      (!data.purchaseCost || !data.saleCost)
    ) {
      throw new BadRequestException(
        'Both purchaseCost and saleCost are required when status is PAGADO.',
      );
    }

    return this.prisma.order.create({
      data: {
        ...rest,
        user: { connect: { id: userId } },
        supplier: { connect: { id: supplierId } },
        status: { connect: { id: statusId } },
        cart: cartId ? { connect: { id: cartId } } : undefined,
      },
    });
  }

  async getOrdersById(id: number): Promise<Order> {
    return this.prisma.order.findUnique({ where: { id } });
  }

  async findAllOrders(): Promise<Order[]> {
    return this.prisma.order.findMany();
  }

  async updateOrderStatus(
    orderId: number,
    statusId: number,
    purchaseCost?: number,
    saleCost?: number,
  ): Promise<Order> {
    if (
      statusId === (await this.getPaidStatusId()) &&
      (!purchaseCost || !saleCost)
    ) {
      throw new BadRequestException(
        'Both purchaseCost and saleCost are required when status is PAGADO.',
      );
    }

    return this.prisma.order.update({
      where: { id: orderId },
      data: { status: { connect: { id: statusId } }, purchaseCost, saleCost },
    });
  }

  async updateOrder(id: number, data: any): Promise<Order> {
    if (
      data.statusId === (await this.getPaidStatusId()) &&
      (!data.purchaseCost || !data.saleCost)
    ) {
      throw new BadRequestException(
        'Both purchaseCost and saleCost are required when status is PAGADO.',
      );
    }

    return this.prisma.order.update({
      where: { id },
      data,
    });
  }

  async deleteOrder(id: number): Promise<Order> {
    return this.prisma.order.delete({ where: { id } });
  }

  private async getPaidStatusId(): Promise<number> {
    const status = await this.prisma.orderStatus.findUnique({
      where: { name: 'PAGADO' },
    });
    if (!status) {
      throw new BadRequestException('PAGADO status not found.');
    }
    return status.id;
  }
}
