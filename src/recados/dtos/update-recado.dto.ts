import { PartialType } from "@nestjs/mapped-types";
import { CreateRecadoDto } from "./create-recado.dto";
import { Optional } from "@nestjs/common";
import { IsBoolean } from "class-validator";
import { Exclude } from "class-transformer";

export class UpdateRecadoDto extends PartialType(CreateRecadoDto) {
    @Optional()
    @IsBoolean()
    lido?: boolean;

    @Exclude()
    de?: string;

    @Exclude()
    para?: string;
}