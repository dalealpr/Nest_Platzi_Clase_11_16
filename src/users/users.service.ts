import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async getAllUsers() {
    return await this.userRepository.find();
  }

  async getUserById(id: number) {
    const user = await this._findOne(id);
    if (user.id === 1) {
      throw new ForbiddenException('You are not allowed to access this user');
    }
    return user;
  }

  async create(body: CreateUserDto) {
    try {
      const newUser = await this.userRepository.save(body);
      return newUser;
    } catch (error) {
      throw new BadRequestException('Error creating user', error);
    }
  }

  async update(id: number, changes: UpdateUserDto) {
    const user = await this._findOne(id);
    const updatedUser = this.userRepository.merge(user, changes);
    return updatedUser;
  }

  async delete(id: number) {
    const user = await this._findOne(id);
    await this.userRepository.delete(user.id);
    return { message: `User id:${id} deleted` };
  }

  private async _findOne(id: number) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`User with id: ${id} not found`);
    }
    return user;
  }
}
