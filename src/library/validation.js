import {
    body,
    validationResult
} from "express-validator"

export const postValidation = [
    body("comment").exists().isInt({ min: 0, max: 5 }).withMessage("This field is mandatory!"),
    body("rate").exists().withMessage("This field is mandatory!"),
]