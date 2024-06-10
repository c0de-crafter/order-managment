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
import { CartsService } from './carts.service';
import { Cart } from '@prisma/client';
import { ApiTags, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('carts')
@Controller('carts')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class CartsController {
  constructor(private cartsService: CartsService) {}

  @Post()
  @ApiBody({
    schema: {
      example: {
        startDate: '2024-01-01T00:00:00Z',
        endDate: '2024-01-31T23:59:59Z',
      },
    },
  })
  createCart(
    @Body()
    cartData: {
      startDate: Date;
      endDate: Date;
    },
  ): Promise<Cart> {
    return this.cartsService.createCart(cartData);
  }

  @Get()
  getAllCarts(): Promise<Cart[]> {
    return this.cartsService.getAllCarts();
  }

  @Get(':id')
  getCartById(@Param('id') id: string): Promise<Cart> {
    return this.cartsService.getCartById(Number(id));
  }

  @Put(':id')
  updateCart(
    @Param('id') id: string,
    @Body()
    cartData: { startDate?: Date; endDate?: Date },
  ): Promise<Cart> {
    return this.cartsService.updateCart(Number(id), cartData);
  }

  @Delete(':id')
  deleteCart(@Param('id') id: string): Promise<Cart> {
    return this.cartsService.deleteCart(Number(id));
  }
}
