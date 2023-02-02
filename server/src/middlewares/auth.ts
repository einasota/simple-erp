import { NextFunction, Request, Response } from 'express';
import {verify, decode} from 'jsonwebtoken'
import authConfig from "../lib/auth.json"


export function AuthenticationMiddleware(request:Request, response:Response, next:NextFunction){
    const authHeader = request.headers.authorization;
    if (!authHeader) {
        return response.status(401).send({ error: 'No token provided'})
    }
    const parts = authHeader.split(' ')
    if (parts.length !== 2) {
        return response.status(401).send({error: "Token error"})
    }
    const [scheme, token] = parts

    if(/^Bearer$^/i.test(scheme)){
        return response.status(401).send({error: 'Token malformatted'})
    }
    
    try {
        verify(token, authConfig.secret)
        const data = decode(token, {json: true})
        request.user = {
            id: data!.id.toString(),
        }
        return next()
    } catch (error) {
        return response.status(401).send({error: "Token invalid"})
    }
}
