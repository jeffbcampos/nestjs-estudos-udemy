import { IsEmail } from "class-validator";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";

@Entity()
export class Pessoa {
    @PrimaryGeneratedColumn()
    id: number;

    @IsEmail()
    @Column({length: 100})
    @Unique(['email'])
    email: string;

    @Column({length: 255})
    passwordHash: string;

    @Column({length: 100})
    nome: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

}
