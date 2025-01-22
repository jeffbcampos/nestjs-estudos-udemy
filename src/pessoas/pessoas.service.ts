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

    try {

      if (!createPessoaDto.nome || !createPessoaDto.email || !createPessoaDto.passwordHash) {
        throw new BadRequestException('Nome, email e passwordHash são obrigatórios');
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(createPessoaDto.passwordHash, salt);

      const newPessoa = await this.pessoaRepository.save({
        ...createPessoaDto,
        passwordHash: hashedPassword
      });

      return newPessoa;
      
    } catch (error: any) {
      if (error.code === '23505') {
        throw new ConflictException('Email já cadastrado');
      }

      throw error;
    }    
    
  }

  async findAll() {
    const pessoas = await this.pessoaRepository.find({
      order: {
        nome: 'ASC'
      }
    });

    return pessoas;
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

    if(updatePessoaDto.passwordHash) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(updatePessoaDto.passwordHash, salt);

      updatePessoaDto.passwordHash = hashedPassword;
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
