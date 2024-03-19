import { Injectable,NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import {Product,ProductDocument} from "./schemas/product.schema"
import {InjectModel} from "@nestjs/mongoose"
import { Model } from 'mongoose';

@Injectable()
export class ProductsService {
  constructor(@InjectModel(Product.name) private productModel: Model<ProductDocument>) {}
  async create(createProductDto: CreateProductDto):Promise<Product> {
    const result = new this.productModel(createProductDto)
    return result.save()
  }

  async findAll():Promise<Product[]> {
   const result= this.productModel.find().populate('orderId').exec()
    return result
  }

  async findOne(id: string):Promise<Product> {
    const result = this.productModel.findById(id).populate('orderId').exec()
    return result
  }

 async update(id: string, updateProductDto: UpdateProductDto):Promise<Product> {
    const result = this.productModel.findByIdAndUpdate(id,updateProductDto,{new:true}).exec()
    return result
  }

 async remove(id: string) {
  try { 
    const result = await this.productModel.findByIdAndDelete(id).exec()
    if(!result) {
      // throw new NotFoundException("id not found")
      throw new NotFoundException("id was not found")
    }
    return {message:"Successful"}
  }
   catch (error) {
    throw error;
    
  }
}

}
