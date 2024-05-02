import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity({ name: 'member' })
export class Member {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ unique: true, nullable: true })
    document: string

    @Column()
    name: string

    @Column()
    lastName: string

    @Column({ nullable: true })
    phone: string

    @Column({ nullable: true })
    address: string

    @Column({ nullable: true })
    email: string

    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: string

    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    updatedAt: string
}