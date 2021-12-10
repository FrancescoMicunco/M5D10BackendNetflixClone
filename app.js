import express from 'express'
import listendpoints from 'express-list-endpoints'
import cors from 'cors'


const server = express()
const port = process.env.PORT || 3001

server.use(express.json())
server.use(cors())



console.table(listendpoints)
server.listen(port, () => { console.log(`server is running on ${port}`) })