import express, { request } from 'express'
import dotenv from 'dotenv'

dotenv.config()

const app = express()

app.get('/', (resquest, response) => {
    response.send("Server is Running")
})

app.listen(3333, () => {
    console.log("Server is Running in http://localhost:3333")
})
