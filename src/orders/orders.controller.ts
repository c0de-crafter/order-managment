import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  Patch,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { Order } from '@prisma/client';
import { ApiTags, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('orders')
@Controller('orders')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @Post()
  @ApiBody({
    schema: {
      example: {
        userId: 1,
        productLink: 'http://example.com/product',
        details: { color: 'red', size: 'M' },
        supplierId: 1,
        statusId: 1,
        code: 'ABC123',
      },
    },
  })
  createOrder(
    @Body()
    orderData: {
      userId: number;
      productLink: string;
      details: any;
      supplierId: number;
      statusId: number;
      code?: string;
    },
  ): Promise<Order> {
    return this.ordersService.createOrder(orderData);
  }

  @Get(':userId')
  getOrdersByUserId(@Param('userId') userId: string): Promise<Order[]> {
    return this.ordersService.getOrdersByUserId(Number(userId));
  }

  @Get()
  getAllOrders(): Promise<Order[]> {
    return this.ordersService.findAllOrders();
  }

  @Patch(':orderId')
  @ApiBody({ schema: { example: { statusId: 2 } } })
  updateOrderStatus(
    @Param('orderId') orderId: string,
    @Body('statusId') statusId: number,
  ): Promise<Order> {
    return this.ordersService.updateOrderStatus(Number(orderId), statusId);
  }

  @Put(':orderId')
  updateOrder(
    @Param('orderId') orderId: string,
    @Body()
    orderData: {
      productLink?: string;
      details?: any;
      statusId?: number;
      code?: string;
    },
  ): Promise<Order> {
    return this.ordersService.updateOrder(Number(orderId), orderData);
  }

  @Delete(':orderId')
  deleteOrder(@Param('orderId') orderId: string): Promise<Order> {
    return this.ordersService.deleteOrder(Number(orderId));
  }
}
