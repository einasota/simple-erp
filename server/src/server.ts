import express, { request } from 'express'
import dotenv from 'dotenv'
import { routes } from "./routes"

dotenv.config()

const app = express()
app.use(express.json())
app.use(routes)

app.get('/', (request, response) => {
    response.send("Server is Running")
})

app.listen(3333, () => {
    console.log("Server is Running in http://localhost:3333")
})
