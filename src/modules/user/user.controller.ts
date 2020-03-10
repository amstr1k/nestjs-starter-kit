import { Controller, Get, Param } from '@nestjs/common';

@Controller('user')
export class UserController {
  @Get()
  findAll(): string {
    return `This action returns all users`;
  }

  @Get('/:id')
  getById(@Param('id') id: number): string {
    return `This action returns User Id ${id}`;
  }
}
