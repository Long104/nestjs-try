import { Injectable, NotAcceptableException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order, OrderDocument } from './schemas/order.schema'
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {ProductsService} from "../products/products.service"

@Injectable()
export class OrdersService {
  constructor(@InjectModel(Order.name) private orderModel:Model<OrderDocument>,
    private productService :ProductsService
  ) {}
  async create(createOrderDto: CreateOrderDto):Promise<Order> {
  const productResult = await this.productService.findOne(createOrderDto.productId)

  if(!productResult) {
    throw new NotAcceptableException('product not found')
  }
  const result = new this.orderModel(createOrderDto)
  return result.save()
  }

  async findAll():Promise<Order[]> {
    const result = this.orderModel.find().populate('productId').exec()
    return result
  }


  async findOne(id: string):Promise<Order> {
   const result =  this.orderModel.findById(id).populate('productId').exec()
   return result
  }
  async removee(id:string) {
    try {  
    const result = await this.orderModel.findByIdAndDelete(id).exec()
    if(!result) {
      throw new NotAcceptableException("wrong id maybe can't delete")
    }
    return {message:'succesfull'}
    } catch (error) {
      console.log(error)
      
    }
  }


}
