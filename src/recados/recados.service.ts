import { PessoasService } from './../pessoas/pessoas.service';
import { CreateRecadoDto } from './dtos/create-recado.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Recado } from './entities/recado.entity';
import { UpdateRecadoDto } from './dtos/update-recado.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaginationDTO } from 'src/common/dto/pagination.dto';

@Injectable()
export class RecadosService {
    constructor(
        @InjectRepository(Recado)
        private readonly recadoRepository: Repository<Recado>,
        private readonly pessoasService: PessoasService
    ) {}    
    async findAll(paginationDTO?: PaginationDTO) {
        const { limit = 10, offset = 0 } = paginationDTO;
        
        const recados = await this.recadoRepository.find({
            take: limit,
            skip: offset,
            relations: ['de', 'para'],
            select: {
                de: {
                    id: true,
                    nome: true
                },
                para: {
                    id: true,
                    nome: true
                }
            }
        });
        return recados;
    }

    async findOne(id: number) {
        const idParam = Number(id);        
        const recado = await this.recadoRepository.findOne({
            where: {
                id: idParam
            },
            relations: ['de', 'para'],
            select: {
                de: {
                    id: true,
                    nome: true
                },
                para: {
                    id: true,
                    nome: true
                }
            }
        });
        
        if (!recado) {
            throw new NotFoundException('Recado não encontrado');
        };

        return recado;
    }

    async create(createRecadoDto: CreateRecadoDto) {
        const { deId, paraId } = createRecadoDto;

        const de = await this.pessoasService.findOne(deId);

        const para = await this.pessoasService.findOne(paraId);

        const novoRecado = await this.recadoRepository.save({
            texto: createRecadoDto.texto,           
            de: de,
            para: para,
            lido: false,
            data: new Date()
        });

        return {
            ...novoRecado,
            de: {
                id: novoRecado.de.id,
            },
            para: {
                id: novoRecado.para.id,
            }
        }
    }

    async update(id: number, updateRecadoDto: UpdateRecadoDto) {
        const idParam = Number(id);
                
        const recadoExistente = await this.findOne(idParam);

        if (!recadoExistente) {
            throw new NotFoundException('Recado não encontrado');
        }

        recadoExistente.texto = updateRecadoDto?.texto ?? recadoExistente.texto;
        recadoExistente.lido = updateRecadoDto?.lido ?? recadoExistente.lido;

        await this.recadoRepository.update(idParam, recadoExistente);

        return recadoExistente;
        
    }

    async remove(id: number) {
        const idParam = Number(id);
        const recadoIndex = await this.recadoRepository.findOne({
            where: {
                id: idParam
            }
        });
        if (!recadoIndex) {
            throw new NotFoundException('Recado não encontrado');
        }

        return await this.recadoRepository.remove(recadoIndex);        
    }
}
