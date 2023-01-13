import { Request, Response } from "express";
import { prismaClient } from "../database/PrismaClient"
export class SalesController {
    async create(request: Request, response: Response) {
        const {
            client,
            products,
            value,
            discont,
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
                discont,
                hasWarranty,
                warranty,
                paid,
                userId
            }
        })
        return response.status(201).send()
    }
}