import express from 'express'
import uniqid from "uniqid"
import createHttpError from "http-errors"
import { postValidation } from '../library/validation.js'
import { body, validationResult } from 'express-validator'
import { getMedia, writeMedia } from '../library/functions.js'
import { getReviews, writeReviews } from '../library/functions.js'
import { getReadble } from '../library/pdfDownloader.js'
// import { CloudinaryStorage } from 'multer-storage-cloudinary'
// import { v2 as cloudinary } from 'cloudinary'
import multer from 'multer'
import { upload, uploadFile } from '../library/upload.js'

const mediaRouter = express.Router()


// =================  GET ==============
// =====================================

mediaRouter.get("/", async(req, res, next) => {
        try {
            const reviewsGet = await getMedia()
            res.send(reviewsGet)
        } catch (error) {
            next(error)
        }

    })
    // =================  GET + ID ==============
    // ==========================================

mediaRouter.get("/:id", async(req, res, next) => {
    try {
        const mediaGet = await getMedia()
        const index = mediaGet.findIndex(p => p.id === req.params.id)
        if (index !== -1) {
            res.send(mediaGet[index])
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

mediaRouter.put("/:id", async(req, res, next) => {
    try {
        const mediaGet = await getMedia()
        const findIndex = mediaGet.findIndex(e => e.id === req.params.id)
        console.log(findIndex)
        mediaGet[findIndex] = {
            ...mediaGet[findIndex],
            ...req.body,
            updatedAt: new Date()
        }
        await writeMedia(mediaGet)
        res.send("Post updated!")
    } catch (error) {
        next(error)
    }
})

// =================  DELETE ==============
// =====================================
mediaRouter.delete("/:id", async(req, res, next) => {
    try {
        const mediaGet = await getMedia()
        const indexDeletingMedia = mediaGet.filter(e => e.id !== req.params.id)
        await writeMedia(indexDeletingMedia)
        res.status(204).send()
    } catch (error) {
        next(error)
    }
})


// =================  POST + ID + POSTER ==============
// =====================================
mediaRouter.post("/:id/poster", upload.single('poster'), uploadFile, async(req, res, next) => {
    try {
        const mediaGet = await getMedia()
        const findIndex = mediaGet.findIndex(e => e.id === req.params.id)
        console.log("THIS IS THE searched user", findIndex)
        if (findIndex !== -1) {
            const searched = mediaGet[findIndex]
            const changedMediaPoster = {
                ...searched,
                poster: req.file,
                updatedAt: new Date(),
                id: req.params.id
            }
            mediaGet[findIndex] = changedMediaPoster
            await writeMedia(mediaGet)
            res.send("Done!")
        } else {
            res.status(404).send({
                message: `Media not found!`
            });
        }
    } catch (error) {
        res.status(500).send("General error")
    }
    next(error)
})

// =================  POST + ID + REVIEWS ==============
// =====================================
mediaRouter.post("/:id/reviews", postValidation, async(req, res, next) => {

    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {

            next(createHttpError(400, "Some field bad filled!", { errors }))
        } else {
            const reviewsGet = await getReviews()
            const { comment, rate } = req.body
            const newReview = {
                "id": req.params.id,
                ...req.body,
                "createdAt": new Date()
            }
            reviewsGet.push(newReview)
            await writeReviews(reviewsGet)

            res.status(201).send({
                id: newReview.id
            })
        }
    } catch (error) {
        next(error)
    }
})

mediaRouter.delete("/:id/reviews", (req, res, next) => {
    res.send("it works 7")
})


// =================  GET + ID + pdf ==============
// ==========================================

mediaRouter.get("/:id/pdf", async(req, res, next) => {
    try {
        res.setHeader(
            "Content-Disposition", "attachement; filename=newfile.pdf"
        )
        const source = getReadble()
        const destination = res
        pipeline(source, destination, err => {
            if (err) next("it's not ok")
        })
    } catch (error) {
        next("it's not ok")
    }


})

export default mediaRouter