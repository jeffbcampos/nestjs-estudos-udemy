import { IsNotEmpty, IsPositive, IsString, MaxLength, MinLength } from "class-validator";

export class CreateRecadoDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(1)
    @MaxLength(255)
    readonly texto: string;
    
    
    @IsNotEmpty()
    @IsPositive()
    readonly deId: number;
    
    
    @IsNotEmpty()
    @IsPositive()    
    readonly paraId: number;
}