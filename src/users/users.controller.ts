import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  // Obtener todos los usuarios
  @Get()
  getUsers() {
    return this.userService.getAllUsers();
  }

  // Obtener usuario por id
  @Get(':id')
  getUserById(@Param('id') id: string) {
    return this.userService.getUserById(+id);
  }

  // Obtener profile por id usuario
  @Get(':id/profile')
  getProfile(@Param('id') id: string) {
    return this.userService.getProfileByUserId(+id);
  }

  // Crear usuario
  @Post()
  CreateUser(@Body() body: CreateUserDto) {
    return this.userService.create(body);
  }

  // Editar usuario
  @Put(':id')
  updateUser(@Param('id') id: string, @Body() changues: UpdateUserDto) {
    return this.userService.update(+id, changues);
  }

  // Borrar usuario por id
  @Delete(':id')
  DeleteUser(@Param('id') id: string) {
    return this.userService.delete(+id);
  }
}
