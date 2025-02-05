import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { RecadosService } from './recados.service';
import { CreateRecadoDto } from './dtos/create-recado.dto';
import { UpdateRecadoDto } from './dtos/update-recado.dto';
import { PaginationDTO } from 'src/common/dto/pagination.dto';

@Controller('recados')
export class RecadosController {
    constructor(
        private readonly recadosService: RecadosService
    ){}

    @Get()
    findAll(@Query() paginationDTO: PaginationDTO) {
        
        return this.recadosService.findAll(paginationDTO);
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        const idParam = Number(id);               
        const recado = this.recadosService.findOne(idParam);        
        return recado;
    }

    @Post()
    create(@Body() createRecadoDto: CreateRecadoDto) {
        const recado = createRecadoDto;
        return this.recadosService.create(recado);
    }

    @Patch(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() updateRecadoDto: UpdateRecadoDto) {
        const idParam = Number(id);
        const recado = updateRecadoDto;
        return this.recadosService.update(idParam, recado);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.recadosService.remove(id);
    }
}
