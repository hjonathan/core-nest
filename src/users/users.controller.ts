import { Controller, Post, Body, Get, Param, ParseIntPipe, Delete, Put } from '@nestjs/common';
import { CreateUserDTO, UpdateUserDTO } from 'src/dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private userService: UsersService) { }

    @Post()
    async createUser(@Body() newUser: CreateUserDTO) {
        return this.userService.createUser(newUser)
    }

    @Get()
    getUsers() {
        return this.userService.getUsers()
    }

    @Get(':id')
    getUser(@Param('id', ParseIntPipe) id) {
        return this.userService.getUser(id)
    }

    @Delete(':id')
    deleteUser(@Param('id', ParseIntPipe) id) {
        return this.userService.deleteUser(id)
    }

    @Put(':id')
    updateUser(@Param('id', ParseIntPipe) id, @Body() newUser: UpdateUserDTO) {
        return this.userService.updateUser(id, newUser)
    }
}
