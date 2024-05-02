import { Controller, Get, Body, Res, Post, HttpStatus } from '@nestjs/common';
import { MembersService } from './members.service';
import { Response } from 'express';
import { MemberDTO } from './dto/member.dto';

@Controller('members')
export class MembersController {
    membersService: MembersService

    constructor(membersService: MembersService) {
        this.membersService = membersService
    }

    @Get()
    async getMembers(@Res() res: Response) {
        const response = await this.membersService.getMembers()

        return res.send(response)
    }

    @Post()
    async createMember(@Body() member: MemberDTO, @Res() res: Response) {
        const response = await this.membersService.createMember(member)

        return res.send(response)

    }
}
