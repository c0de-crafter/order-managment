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
import { SuppliersService } from './suppliers.service';
import { Supplier } from '@prisma/client';
import { ApiTags, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('suppliers')
@Controller('suppliers')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class SuppliersController {
  constructor(private suppliersService: SuppliersService) {}

  @Post()
  @ApiBody({
    schema: {
      example: { name: 'Supplier Name', website: 'http://example.com' },
    },
  })
  createSupplier(
    @Body() supplierData: { name: string; website: string },
  ): Promise<Supplier> {
    return this.suppliersService.createSupplier(supplierData);
  }

  @Get()
  getAllSuppliers(): Promise<Supplier[]> {
    return this.suppliersService.getAllSuppliers();
  }

  @Get(':id')
  getSupplierById(@Param('id') id: string): Promise<Supplier> {
    return this.suppliersService.getSupplierById(Number(id));
  }

  @Put(':id')
  updateSupplier(
    @Param('id') id: string,
    @Body() supplierData: { name?: string; website?: string },
  ): Promise<Supplier> {
    return this.suppliersService.updateSupplier(Number(id), supplierData);
  }

  @Delete(':id')
  deleteSupplier(@Param('id') id: string): Promise<Supplier> {
    return this.suppliersService.deleteSupplier(Number(id));
  }
}
