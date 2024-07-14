import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  async create(@Body() body: CreateUserDto) {
    const user = await this.usersService.create(
      body.name,
      body.email,
      body.password,
    );
    return user;
  }

  @Get()
  async findAll(@Query('email') email?: string) {
    return this.usersService.findAll(email);
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() body: Partial<CreateUserDto>) {
    return this.usersService.update(id, body);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.usersService.remove(id);
  }
}
