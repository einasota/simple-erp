import { Request, Response } from "express";
import { prismaClient } from "../database/PrismaClient";
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import authconfig from '../lib/auth.json'
export class AuthController {
    async register (request: Request, response: Response) {
        const {name, login,pass} = request.body
        try {
            if (await prismaClient.user.findUnique({where: {login}})) {
                return response.status(400).send({error: 'Login already exists'})
            } 
            const hash = await bcryptjs.hash(pass, 10)
            await prismaClient.user.create({
                data: {
                    name,
                    login,
                    pass: hash
                }
            })
            return response.status(201).send({success: "user created successfully"})
        } catch (error) {
            console.log(error)
            return response.status(400).send({error: 'Registration Failed, check your information'})
        }
    }
    async login (request:Request, response:Response) {
        const {login, pass} = request.body
        try {
            const user = await prismaClient.user.findUnique({
                where: {
                    login
                }
            })
            if (!user){
                return response.status(400).send({error: 'User not found'})
            }
            if (!await bcryptjs.compare(pass, user.pass)){
                return response.status(400).send({error: 'Invalid password'})
            }
            const token = jwt.sign({id: user.id}, authconfig.secret, {
                expiresIn: 14400,
            })
            user.pass = ""
            return response.status(200).send({user, token})
        } catch (error) {
            console.log(error)
            return response.status(400).send({error: 'invalid login and password, check your information'})
        }
    }
}