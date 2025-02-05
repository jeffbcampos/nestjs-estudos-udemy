import { IsEmail } from "class-validator";
import { Recado } from "src/recados/entities/recado.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";

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

    @Column({ nullable: true })    
    role: string | null;

    @OneToMany(() => Recado, recado => recado.de)
    recadosEnviados: Recado[];

    @OneToMany(() => Recado, recado => recado.para)
    recadosRecebidos: Recado[];

}
