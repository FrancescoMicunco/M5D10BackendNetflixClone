import {
    body,
} from "express-validator"

export const postValidation = [
    body("comment").exists().withMessage("This field is mandatory!"),
    body("rate").exists().withMessage("This field is mandatory!").isInt({
        min: 0,
        max: 5
    }).withMessage("Value between 0 and 5!"),
]