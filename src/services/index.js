import express from 'express'
import uniqid from "uniqid"
import createHttpError from "http-errors"
// import { postValidation } from '../../lib/validation.js'
// import { validationResult } from 'express-validator'
import { getMedia, writeMedia } from '../library/functions.js'
// import { CloudinaryStorage } from 'multer-storage-cloudinary'
// import { v2 as cloudinary } from 'cloudinary'
import multer from 'multer'


const mediaRouter = express.Router()

mediaRouter.get("/", async(req, res, next) => {
    try {
        const mediaGet = await getMedia()
        res.send(mediaGet)
    } catch (error) {
        console.log("gerenal error")
    }
    next(error)
})


mediaRouter.get("/:id", (req, res, next) => {
    res.send("it works 2")
})

mediaRouter.post("/", (req, res, next) => {
    res.send("it works 3")
})


mediaRouter.put("/:id", (req, res, next) => {
    res.send("it works")
})

mediaRouter.delete("/:id", (req, res, next) => {
    res.send("it works 4")
})

mediaRouter.post("/:id/poster", (req, res, next) => {
    res.send("it works 5")
})

mediaRouter.post("/:id/reviews", (req, res, next) => {
    res.send("it works 6")
})

mediaRouter.delete("/:id/reviews", (req, res, next) => {
    res.send("it works 7")
})


mediaRouter.get("/:id/pdf", (req, res, next) => {
    res.send("it works 8")
})

export default mediaRouter