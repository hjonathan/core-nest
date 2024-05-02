import { HttpStatus, Injectable } from '@nestjs/common';
import { Auth } from './auth.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoginDTO, RefreshTokenDTO, UserProfileDTO } from './dto/auth.dto';
import { HttpHandler, HttpErrorHandler } from '@shared';
import { hash, compare } from 'bcrypt';

import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    authRepo: Repository<Auth>

    constructor(@InjectRepository(Auth) authRepo: Repository<Auth>, private jwtService: JwtService) {
        this.authRepo = authRepo
    }

    async registerUserProfile(profile: UserProfileDTO) {
        try {
            const { password } = profile
            const plainToHash = await hash(password, 10)

            const newProfile = this.authRepo.create({
                ...profile,
                password: plainToHash
            })

            const response = await this.authRepo.save(newProfile)

            return new HttpHandler({ message: 'User profile created succesfully', data: response })
        }
        catch (e) {
            return new HttpErrorHandler({ message: e.sqlMessage, error: null, statusCode: HttpStatus.NOT_FOUND })
        }
    }

    async login(profile: LoginDTO) {
        const { password, username } = profile

        const searchedUser = await this.authRepo.findOne({
            where: [{ username }, { email: username }]
        })

        if (!searchedUser) {
            return new HttpErrorHandler({
                message: 'The user does not exist',
                error: {
                    username: 'Invalid username'
                },
                statusCode: HttpStatus.NOT_FOUND
            })
        }

        const checkPwd = await compare(password, searchedUser.password)

        const payload = { sub: searchedUser.id, username: searchedUser.username };

        if (checkPwd) {
            return new HttpHandler({
                message: 'Login successfully',
                data: {
                    ...searchedUser, credentials: {
                        access_token: await this.jwtService.sign(payload, { expiresIn: 2 }),
                    }
                }
            })
        }

        return new HttpErrorHandler({
            message: 'Invalid password',
            error: {
                password: 'Invalid password'
            },
            statusCode: HttpStatus.NOT_FOUND
        })

    }

    async refresh(refreshDTO: RefreshTokenDTO) {
        const response = await this.jwtService.decode(refreshDTO.accessToken)

        const payload = {
            ...response
        }

        return new HttpHandler({
            message: 'Login successfully',
            data: {
                ...payload, credentials: {
                    access_token: await this.jwtService.sign(payload),
                }
            }
        })
    }

    async getTokens(user: number, email: string) {
        const jwtTokens = {
            id: user,
            email: email
        }

        const [at, rt] = await Promise.all([
            this.jwtService.signAsync(jwtTokens, { expiresIn: '1d' }),
            this.jwtService.signAsync(jwtTokens, { expiresIn: '7d' }),
        ])

        return {
            access_token: at,
            refresh_token: rt

        }
    }
}
