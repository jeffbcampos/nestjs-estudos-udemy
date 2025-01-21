import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePessoaDto } from './dto/create-pessoa.dto';
import { UpdatePessoaDto } from './dto/update-pessoa.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Pessoa } from './entities/pessoa.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class PessoasService {
  constructor(
    @InjectRepository(Pessoa)
    private readonly pessoaRepository: Repository<Pessoa>
  ) {}

  async create(createPessoaDto: CreatePessoaDto) {

    if (!createPessoaDto.nome || !createPessoaDto.email || !createPessoaDto.passwordHash) {
      throw new BadRequestException('Nome, email e passwordHash são obrigatórios');
    }

    const pessoaExistente = await this.pessoaRepository.findOne({
      where: {
        email: createPessoaDto.email
      }
    })

    if (pessoaExistente) {
      throw new ConflictException('Email já cadastrado');
    }
    
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(createPessoaDto.passwordHash, salt);


    const newPessoa = await this.pessoaRepository.save({
      ...createPessoaDto,
      passwordHash: hashedPassword
    });

    return newPessoa;
  }

  findAll() {
    return this.pessoaRepository.find();
  }

  async findOne(id: number) {
    const pessoa = await this.pessoaRepository.findOne({
      where: {
        id: id
      }
    });

    if(!pessoa) {
      throw new NotFoundException('Pessoa não encontrada');
    }

    return pessoa;
  }

  async update(id: number, updatePessoaDto: UpdatePessoaDto) {
    const pessoa = await this.pessoaRepository.findOne({
      where: {
        id: id
      }
    });
    
    if (!pessoa) {
      throw new NotFoundException('Pessoa não encontrada');
    }

    await this.pessoaRepository.update(id, updatePessoaDto);

    return {status: 'success', message: 'Pessoa atualizada com sucesso'};
    
  }

  remove(id: number) {
    const pessoa = this.pessoaRepository.findOne({
      where: {
        id: id
      }
    });

    if (!pessoa) {
      throw new NotFoundException('Pessoa não encontrada');
    }

    this.pessoaRepository.delete(id);
  }
}
