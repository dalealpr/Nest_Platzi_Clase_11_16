import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from './user.model';
import { CreateUserDto, UpdateUserDto } from './user.dto';

@Injectable()
export class UsersService {
  // Array Mock
  private users: User[] = [
    {
      id: '1',
      name: 'Maria Doe',
      email: 'maria.doe@example.com',
    },
    {
      id: '2',
      name: 'Jhon Doe',
      email: 'john.doe@example.com',
    },
    {
      id: '3',
      name: 'Jane Doe',
      email: 'jane.doe@example.com',
    },
  ];

  getAllUsers() {
    return this.users;
  }

  getUserById(id: string) {
    const position = this._findOne(id);
    const user = this.users[position];
    if (user.id === '1') {
      throw new ForbiddenException('You are not allowed to access this user');
    }
    return user;
  }

  create(body: CreateUserDto) {
    const newUser = {
      ...body,
      id: new Date().getTime().toString(),
    };
    this.users.push(newUser);
    return newUser;
  }

  update(id: string, changues: UpdateUserDto) {
    const position = this._findOne(id);
    const currentData = this.users[position];
    const updateUser = {
      ...currentData,
      ...changues,
    };
    this.users[position] = updateUser;
    return updateUser;
  }

  delete(id: string) {
    const position = this._findOne(id);
    this.users.splice(position, 1);
    return { message: `User id:${id} deleted` };
  }

  private _findOne(id: string) {
    const position = this.users.findIndex((user) => user.id === id);
    if (position === -1) {
      throw new NotFoundException(`User with id: ${id} not found`);
    }
    return position;
  }
}
