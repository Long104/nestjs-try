import { IsMongoId, IsNotEmpty, IsNumber, Min } from "class-validator";

export class CreateOrderDto {
@IsNotEmpty()
@IsMongoId()
readonly productId: string;

// @IsNumber()
@Min(1)
@IsNumber()
readonly quantity: number = 1

}
