import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { OrderStatusService } from './order-status.service';
import { OrderStatus } from '@prisma/client';
import { ApiTags, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('order-status')
@Controller('order-status')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class OrderStatusController {
  constructor(private orderStatusService: OrderStatusService) {}

  @Post()
  @ApiBody({ schema: { example: { name: 'Pending' } } })
  createOrderStatus(
    @Body() orderStatusData: { name: string },
  ): Promise<OrderStatus> {
    return this.orderStatusService.createOrderStatus(orderStatusData);
  }

  @Get()
  getAllOrderStatuses(): Promise<OrderStatus[]> {
    return this.orderStatusService.getAllOrderStatuses();
  }

  @Get(':id')
  getOrderStatusById(@Param('id') id: string): Promise<OrderStatus> {
    return this.orderStatusService.getOrderStatusById(Number(id));
  }

  @Put(':id')
  updateOrderStatus(
    @Param('id') id: string,
    @Body() orderStatusData: { name?: string },
  ): Promise<OrderStatus> {
    return this.orderStatusService.updateOrderStatus(
      Number(id),
      orderStatusData,
    );
  }

  @Delete(':id')
  deleteOrderStatus(@Param('id') id: string): Promise<OrderStatus> {
    return this.orderStatusService.deleteOrderStatus(Number(id));
  }
}
