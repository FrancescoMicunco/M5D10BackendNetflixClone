import express from 'express'


const mediaRouter = express.Router()

mediaRouter.get("/", (req, res, next) => {

    res.send("it works")
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