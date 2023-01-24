import { Request, Response } from "express";
import { prismaClient } from "../database/PrismaClient"
import dayjs from "dayjs";
export class ReportsController {
    async daily (request:Request, response:Response){
        const today = dayjs(new Date()).startOf('day').toDate()
        const results = await prismaClient.sell.findMany({
            where: {
                createdAt: {
                    gte: today,
                }
            }
        })
        
        return response.status(200).send(results)
    }
    async weekly (request: Request, response: Response) {
        const lastWeek = dayjs(new Date()).startOf('day').subtract(1, 'week').toDate()
        console.log(lastWeek)
        const results = await prismaClient.sell.findMany({
            where: {
                createdAt: {
                    gte: lastWeek,
                }
            }
        })
        console.log(lastWeek, results)
        return response.status(200).send(results)
    }
    async notpaid (request: Request, response: Response) {
        const results = await prismaClient.sell.findMany({
            where: {
                paid : {
                    equals: false
                }
            }
        })
        return response.status(200).send(results)
    }
    async all (request: Request, response: Response) {
        const results = await prismaClient.sell.findMany()
        return response.status(200).send(results)
    }
}