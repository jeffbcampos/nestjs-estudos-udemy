import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreatePessoaDto {

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @MinLength(6)
    @IsNotEmpty()
    passwordHash: string;

    @IsString()
    @IsNotEmpty()
    nome: string;
}
