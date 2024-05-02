import { HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Member } from './entity/member.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpHandler, HttpErrorHandler } from '@shared';
import { MemberDTO } from './dto/member.dto';

@Injectable()
export class MembersService {
    membersRepo: Repository<Member>
    constructor(@InjectRepository(Member) membersRepo: Repository<Member>) {
        this.membersRepo = membersRepo
    }

    async getMembers() {
        try {
            const response = await this.membersRepo.find({})

            return new HttpHandler({
                message: '',
                data: response
            })
        }
        catch (e) {
            return new HttpErrorHandler({
                message: e.sqlMessage,
                error: null,
                statusCode: HttpStatus.NOT_FOUND
            })
        }
    }

    async createMember(member: MemberDTO) {
        try {
            const newMember = this.membersRepo.create({
                ...member
            })

            const response = await this.membersRepo.save(newMember)

            return new HttpHandler({
                message: 'Member created successfully',
                data: response
            })
        }
        catch (e) {
            return new HttpErrorHandler({
                message: e.sqlMessage,
                error: null,
                statusCode: HttpStatus.BAD_REQUEST
            })
        }
    }
}
