import { AuthService } from './../auth/auth.service';
import { Module } from '@nestjs/common';
import { PessoasService } from './pessoas.service';
import { PessoasController } from './pessoas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pessoa } from './entities/pessoa.entity';
import { EncrypterProvider } from 'src/providers/encrypter.provider';
import { configDotenv } from 'dotenv';
import { AuthModule } from 'src/auth/auth.module';
configDotenv();

@Module({
  imports: [TypeOrmModule.forFeature([Pessoa]),
  AuthModule,  
],
  controllers: [PessoasController],
  providers: [PessoasService, EncrypterProvider, AuthService],
  exports: [PessoasService, EncrypterProvider]
})
export class PessoasModule {}
