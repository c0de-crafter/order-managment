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
import { UsersService } from './users.service';
import { User } from '@prisma/client';
import { ApiTags, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('users')
@Controller('users')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  @ApiBody({
    schema: {
      example: {
        email: 'user@example.com',
        password: 'password',
        name: 'User Name',
      },
    },
  })
  createUser(
    @Body() userData: { email: string; password: string; name: string },
  ): Promise<User> {
    const { email, password, name } = userData;
    return this.usersService.createUser({
      email,
      password,
      profile: {
        create: {
          name,
        },
      },
    });
  }

  @Get(':id')
  getUserById(@Param('id') id: string): Promise<User> {
    return this.usersService.findUserById(Number(id));
  }

  @Get()
  getAllUsers(): Promise<User[]> {
    return this.usersService.findAllUsers();
  }

  @Put(':id')
  updateUser(
    @Param('id') id: string,
    @Body() userData: { email?: string; password?: string; name?: string },
  ): Promise<User> {
    return this.usersService.updateUser(Number(id), userData);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string): Promise<User> {
    return this.usersService.deleteUser(Number(id));
  }
}
