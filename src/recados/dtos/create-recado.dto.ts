import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class CreateRecadoDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(1)
    @MaxLength(255)
    readonly texto: string;
    
    @IsString()
    @IsNotEmpty()
    @MinLength(1)
    @MaxLength(30)
    readonly de: string;
    
    @IsString()
    @IsNotEmpty()
    @MinLength(1)
    @MaxLength(30)
    readonly para: string;
}