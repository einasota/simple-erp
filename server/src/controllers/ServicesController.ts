import { Request, Response } from "express";
import { prismaClient } from "../database/PrismaClient"
export class ServicesController {
    async create (request:Request, response:Response){
        const {name, phone, address, products, description,value, warranty,state,method} = request.body
        const service = await prismaClient.service.create({
            data:{
                name,
                phone,
                address,
                products,
                description,
                value,
                method,
                warranty,
                state,
                userId: request.user.id
            }
        })
        return response.status(201).send(service)
    }
    async edit (request:Request, response:Response) {
        const {id} = request.params
        const { description, value, warranty,state } = request.body
        const service = await prismaClient.service.update({
            where: {id},
            data:{description,value,warranty,state}
        })
        return response.status(202).send(service)
    }
}