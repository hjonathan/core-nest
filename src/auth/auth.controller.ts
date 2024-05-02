import { Controller, Post, Body, Res, UseGuards, Get } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { UserProfileDTO, LoginDTO, RefreshTokenDTO } from './dto/auth.dto';
import { JwtGuard } from './guards/local.guard';



@Controller('auth')
export class AuthController {
    authService: AuthService

    constructor(authService: AuthService) {
        this.authService = authService
    }

    @Post('register')
    async registerUserProfile(@Body() profile: UserProfileDTO, @Res() res: Response) {
        const response = await this.authService.registerUserProfile(profile)

        return res.status(response.statusCode).send(response);
    }

    @Post('login')
    async login(@Body() profile: LoginDTO, @Res() res: Response) {
        const response = await this.authService.login(profile)

        return res.status(response.statusCode).send(response)
    }

    @Post('refresh')
    async refresh(@Body() objectRefresh: RefreshTokenDTO, @Res() res: Response) {
        const response = await this.authService.refresh(objectRefresh)

        return res.status(response.statusCode).send(response)
    }

    @UseGuards(JwtGuard)
    @Get('list')
    async list(@Res() res: Response) {

        return res.send('HENRY')
    }
}
