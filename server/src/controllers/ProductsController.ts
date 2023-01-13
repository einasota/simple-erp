import { Request, Response } from "express";
import { prismaClient } from "../database/PrismaClient"
export class ProductsController {
    async create (request:Request, response:Response){
        const { name, value, type } = request.body
        const product = await prismaClient.product.create({
            data: {
                name,
                value,
                type
            }
        })
        return response.status(201).send()
    }
    async list (request:Request, response:Response){
        const products = await prismaClient.product.findMany()
        return response.status(200).send(products)
    }
    async update (request:Request, response:Response){
        const { name, value, type } = request.body
        const { id } = request.params
        const product = await prismaClient.product.update({
            where: {
                id
            },
            data: {
                name,
                value,
                type
            }
        })
        return response.status(200).send()
    }
    async delete (request:Request, response:Response){
        const { id } = request.params
        const product = await prismaClient.product.delete({
            where:{ id }
        })
    }
}