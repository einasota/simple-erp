import { Request, Response, Router } from "express";
import { prismaClient } from "../database/PrismaClient"

export class SalesController {
    async create(request:Request, response:Response) {
        const {
            client,
            products,
            value,
            discount,
            hasWarranty,
            warranty,
            paid,
            method,
        } = request.body
        const sells = await prismaClient.sell.create({
            data: {
                client,
                products,
                value,
                discount,
                hasWarranty,
                warranty,
                paid,
                method,
                userId: request.user.id
            }
        })
        return response.status(201).send(sells)
    }
    async edit( request: Request, response:Response) {
        const { id } = request.params
        const { paid } = request.body
        const sells = await prismaClient.sell.update({
            where: { id },
            data: { paid }
        })
        return response.status(202).send(sells)
    }
}