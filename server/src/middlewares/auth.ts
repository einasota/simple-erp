import { NextFunction, Request, Response } from 'express';
import {verify, decode} from 'jsonwebtoken'
import authConfig from "../lib/auth.json"


export function AuthenticationMiddleware(request:Request, response:Response, next:NextFunction){
    const authHeader = request.headers.authorization;
    console.log(authHeader)
    if (!authHeader) {
        return response.status(401).send({ error: 'No token provided'})
    }
    const parts = authHeader.split(' ')
    if (parts.length !== 2) {
        return response.status(401).send({error: "Token error"})
    }
    const [scheme, token] = parts

    if(/^Bearer$^/i.test(scheme)){
        console.log(authHeader)
        return response.status(401).send({error: 'Token malformatted'})
    }
    
    try {
        verify(token, authConfig.secret)
        const data = decode(token, {json: true})
        request.user = {
            id: data!.id.toString(),
        }
        console.log(request.user.id)
        return next()
    } catch (error) {
        return response.status(401).send({error: "Token invalid"})
    }
}
