import { Injectable, HttpException, HttpStatus, HttpCode } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDTO, UpdateUserDTO } from '../dto/index'
import { HttpErrorHandler, HttpHandler } from '@shared';


@Injectable()
export class UsersService {

  constructor(@InjectRepository(User) private userRepository: Repository<User>) { }

  async createUser(user: CreateUserDTO) {
    try {
      const newUser = this.userRepository.create(user)

      const response = await this.userRepository.save(newUser)

      return new HttpHandler({
        message: 'User created succesfully',
        data: response
      })
    }
    catch (e) {
      return new HttpErrorHandler({
        statusCode: HttpStatus.BAD_REQUEST,
        message: e.sqlMessage,
        error: [e.sqlMessage]
      })
    }
  }

  getUsers() {
    return this.userRepository.find()
  }

  getUser(id: number) {
    return this.userRepository.findOne({
      where: {
        id
      }
    })
  }

  deleteUser(id: number) {
    return this.userRepository.delete({ id })
  }

  updateUser(id: number, user: UpdateUserDTO) {
    return this.userRepository.update({ id }, user)
  }
}
