import { PartialType } from "@nestjs/mapped-types";
import { CreateRecadoDto } from "./create-recado.dto";
import { Optional } from "@nestjs/common";
import { IsBoolean } from "class-validator";
import { Exclude } from "class-transformer";
import { Pessoa } from "src/pessoas/entities/pessoa.entity";

export class UpdateRecadoDto extends PartialType(CreateRecadoDto) {
    @Optional()
    @IsBoolean()
    lido?: boolean;

    @Exclude()
    de?: Pessoa;

    @Exclude()
    para?: Pessoa;
}