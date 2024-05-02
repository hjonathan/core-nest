import { IsDefined, IsEmail, IsNotEmpty } from "class-validator"

export class MemberDTO {
    @IsDefined()
    @IsNotEmpty()
    name: string

    @IsDefined()
    @IsNotEmpty()
    lastName: string

    phone: string

    address: string

    @IsDefined()
    document: string

    email: string
}