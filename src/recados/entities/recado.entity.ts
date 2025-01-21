import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Recado {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column({type: 'varchar', length: 255})
    texto: string;

    @Column({type: 'varchar', length: 255})
    de: string;

    @Column({type: 'varchar', length: 255})
    para: string;

    @Column({type: 'boolean', default: false})
    lido: boolean;

    @Column({type: 'timestamp without time zone'})
    data: Date;

    @CreateDateColumn()
    createdAt?: Date;

    @UpdateDateColumn()
    updatedAt?: Date;
}