import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

export type ProductDocument = Product & Document ;

@Schema()
export class Product {

    @Prop({required:true})
    name:string;

    @Prop()
    description: string;

    @Prop()
    price: number;

    @Prop({type:Types.ObjectId,ref:'Order'})
    orderId: Types.ObjectId



}

export const ProductSchema = SchemaFactory.createForClass(Product)