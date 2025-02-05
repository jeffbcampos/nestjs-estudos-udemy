import { Pessoa } from "src/pessoas/entities/pessoa.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Recado {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column({type: 'varchar', length: 255})
    texto: string;

    @ManyToOne(() => Pessoa, { onDelete: 'CASCADE' })
    @JoinColumn({name: 'de'})    
    de: Pessoa;

    @ManyToOne(() => Pessoa, { onDelete: 'CASCADE' })
    @JoinColumn({name: 'para'})    
    para: Pessoa;

    @Column({type: 'boolean', default: false})
    lido: boolean;

    @Column({type: 'timestamp without time zone'})
    data: Date;

    @CreateDateColumn()
    createdAt?: Date;

    @UpdateDateColumn()
    updatedAt?: Date;
}