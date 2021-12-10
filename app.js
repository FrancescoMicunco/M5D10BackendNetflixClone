import express from 'express'
import listendpoints from 'express-list-endpoints'
import cors from 'cors'
import mediaRouter from './src/services/index.js'
import { badRequest, unauthorized, notFound, genericErr } from './src/middlewares/errorsHandler.js'
import path, {
    dirname,
    join
} from "path";
import {
    fileURLToPath
} from "url";


const server = express()
const port = process.env.PORT || 3001

const publicDir = path.join(dirname(fileURLToPath(
    import.meta.url)), "../public")
console.log("this is Public dir", publicDir)

server.use(express.static(publicDir))


// =================  MIDDELWARES ===============
//==============================================

const whiteList = [process.env.REACT_APP_FE_REMOTE_URL, process.env.REACT_APP_FE_LOCAL_URL]
const corsOption = {
    origin: function(origin, next) {
        if (!origin || whiteList.indexOf(origin) !== -1) {
            next(null, true)
        } else {
            next(new Error("Cors Error occurred!"))
        }
    }
}
server.use(cors(corsOption))
server.use(express.json())


// ==========  END POINT ===========
// ================================
server.use("/media", mediaRouter)


// ===================  ERROR =======================
//===================================================

server.use(badRequest)
server.use(unauthorized)
server.use(notFound)
server.use(genericErr)

console.table(listendpoints(server))
server.listen(port, () => { console.log(`server is running on ${port}`) })