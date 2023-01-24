import { Request, Response } from "express";
import { prismaClient } from "../database/PrismaClient"
import dayjs from "dayjs";
export class ServicesReportsController {
    async monthly (request:Request, response:Response){
        const month = dayjs(new Date()).subtract(1, 'month').toDate()
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