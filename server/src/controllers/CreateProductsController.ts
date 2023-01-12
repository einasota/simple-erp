import { Request, Response } from "express";

export class CreateProductsController {
    async handle (request:Request, response:Response){
        const { name, value, type } = request.body
        
    }
}