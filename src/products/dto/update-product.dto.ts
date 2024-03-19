import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';
import { IsString,IsOptional,IsNumber } from 'class-validator';

export class UpdateProductDto extends PartialType(CreateProductDto) {
    @IsString()
    @IsOptional()
    readonly name?:string;
    @IsString()
    @IsOptional()
    readonly description?: string;
    @IsNumber()
    @IsOptional()
    readonly price?: number
}
