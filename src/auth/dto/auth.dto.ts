import { IsEmail, IsNotEmpty, IsDefined, isDefined } from 'class-validator';

export class UserProfileDTO {
    @IsDefined()
    @IsNotEmpty()
    username: string

    @IsDefined()
    @IsEmail()
    email: string

    @IsDefined()
    @IsNotEmpty()
    password: string
}

export class LoginDTO {
    @IsDefined()
    @IsNotEmpty()
    username: string

    @IsDefined()
    @IsNotEmpty()
    password: string
}

export class RefreshTokenDTO {
    @IsDefined()
    @IsNotEmpty()
    accessToken: string
}