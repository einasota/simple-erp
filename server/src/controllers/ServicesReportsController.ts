import { Request, Response } from "express";
import { prismaClient } from "../database/PrismaClient"
export class ServicesReportsController {
    async monthly (request:Request, response:Response){
        const month = new Date()
        month.setMonth(new Date().getMonth() - 1)
        const results = prismaClient.sell.findMany({
            where: {
                createdAt: {
                    gte: month
                }
            }
        })
      return response.status(200).send(results)
    }
    async all (request:Request, response:Response){
        const results = prismaClient.sell.findMany()
        return response.status(200).send(results)
    }
}