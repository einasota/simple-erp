import { Request, Response } from "express";
import { prismaClient } from "../database/PrismaClient"
export class SalesController {
    async create(request: Request, response: Response) {
        const {
            client,
            products,
            value,
            discount,
            hasWarranty,
            warranty,
            paid,
        } = request.body
        const { userId } = request.params
        const sells = await prismaClient.sell.create({
            data: {
                client,
                products,
                value,
                discount,
                hasWarranty,
                warranty,
                paid,
                userId
            }
        })
        return response.status(201).send()
    }
    async edit( request: Request, response:Response) {
        const { id } = request.params
        const { paid } = request.body
        const sells = await prismaClient.sell.update({
            where: { id },
            data: { paid }
        })
        return response.status(200).send()
    }
}