import { Request, Response } from "express";
import { prismaClient } from "../database/PrismaClient"
export class ReportsController {
    async daily (request:Request, response:Response){
        const results = prismaClient.sell.findMany({
            where: {
                createdAt: {
                    gte: new Date(),
                    lte: new Date()
                }
            }
        })
      return response.status(200).send(results)
    }
    async weekly (request: Request, response: Response) {
        const lessWeek = new Date()
        lessWeek.setDate(new Date().getDate() - 7)
        const results = prismaClient.sell.findMany({
            where: {
                createdAt: {
                    gte: lessWeek,
                }
            }
        })
        return response.status(200).send(results)
    }
    async notpaid (request: Request, response: Response) {
        const results = prismaClient.sell.findMany({
            where: {
                paid : {
                    equals: false
                }
            }
        })
        return response.status(200).send(results)
    }
    async all (request: Request, response: Response) {
        const results = prismaClient.sell.findMany()
        return response.status(200).send(results)
    }
}