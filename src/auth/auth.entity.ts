import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm"

@Entity({ name: 'userProfile' })
export class Auth {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ unique: true })
    username: string

    @Column({ unique: true })
    email: string

    @Column()
    password: string

    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: string

    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    updatedAt: string
}