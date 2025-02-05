import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, HttpCode, UseGuards } from '@nestjs/common';
import { PessoasService } from './pessoas.service';
import { CreatePessoaDto } from './dto/create-pessoa.dto';
import { UpdatePessoaDto } from './dto/update-pessoa.dto';
import { JwtAuthGuard } from 'src/guard/jwt-auth.guard';
import { Roles } from './decorators/roles.decorator';
import { RolesGuard } from 'src/guard/roles.guard';

@Controller('pessoas')
export class PessoasController {
  constructor(
    private readonly pessoasService: PessoasService,    

  ) {}

  @Post()
  create(@Body() createPessoaDto: CreatePessoaDto) {
    return this.pessoasService.create(createPessoaDto);
  }

  @Post('login')
  login(@Body() { email, password }) {    
    return this.pessoasService.login(email, password)
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Get()
  findAll() {
    return this.pessoasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.pessoasService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updatePessoaDto: UpdatePessoaDto) {
    return this.pessoasService.update(+id, updatePessoaDto);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.pessoasService.remove(id);
  }

  // @Post('reset-password')
  // requestPasswordReset(@Body() { email }) {
  //   return this.resetPasswordService.requestPasswordReset(email);
  // }
}
