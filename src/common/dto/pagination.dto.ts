import { Type } from "class-transformer";
import { IsInt, IsOptional, Max, Min } from "class-validator";

export class PaginationDTO {
    @Type(() => Number)
    @IsInt()
    @Min(1)
    @Max(50)
    @IsOptional()
    limit: number;

    @Type(() => Number)
    @IsInt()
    @Min(0)
    @IsOptional()
    offset: number;
}