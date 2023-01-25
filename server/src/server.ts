import express from 'express'
import 'dotenv/config'
import { routes } from "./routes"
import './lib/dayjs'

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false}))
app.use(routes)

app.get('/', (request, response) => {
    response.send("Server is Running")
})

app.listen(3333, () => {
    console.log("Server is Running in http://localhost:3333")
})
