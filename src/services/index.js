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


// =================  GET ==============
// =====================================

mediaRouter.get("/", async(req, res, next) => {
        try {
            const mediaGet = await getMedia()
            res.send(mediaGet)
        } catch (error) {
            next(error)
        }

    })
    // =================  GET + ID ==============
    // ==========================================

mediaRouter.get("/:id", async(req, res, next) => {
    try {
        const mediaGet = await getMedia()
        const index = mediaGet.find(p => p._id === req.params.id)
        if (index) {
            res.send(mediaGet)
        } else {
            next(createHttpError(404, 'Not found!'))
        }
    } catch (error) {
        next(error)
    }
})


// =================  POST ==============
// =====================================


mediaRouter.post("/", async(req, res, next) => {
    try {
        const mediaGet = await getMedia()
        const { Title, Year, Type, Poster } = req.body

        const newMedia = {
            "id": uniqid(),
            ...req.body,
            "createdAt": new Date()
        }
        mediaGet.push(newMedia)
        await writeMedia(mediaGet)
        res.status(201).send({
            id: newMedia._id
        })
    } catch (error) {
        next(error)
    }


})

// =================  PUT ==============
// =====================================

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


// =================  GET + ID + pdf ==============
// ==========================================

mediaRouter.get("/:id/pdf", (req, res, next) => {
    res.send("it works 8")
})

export default mediaRouter