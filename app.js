import express from 'express'
import listendpoints from 'express-list-endpoints'
import cors from 'cors'
import mediaRouter from './src/services/index.js'


const server = express()
const port = process.env.PORT || 3001

server.use(express.json())
server.use(cors())

server.use("/media", mediaRouter)

console.table(listendpoints)
server.listen(port, () => { console.log(`server is running on ${port}`) })