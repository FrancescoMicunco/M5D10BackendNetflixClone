import fs from "fs-extra";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const { readJSON, writeJSON, writeFile } = fs;


//===== media.json======
//======================
const mediaPath = join(dirname(fileURLToPath(
    import.meta.url)), "../data");
console.log(mediaPath)

const mediaPathJSON = join(mediaPath, "media.json");

export const getMedia = () => readJSON(mediaPathJSON);

export const writeMedia = (content) => writeJSON(mediaPathJSON, content);


//===== reviews.json======
//======================
const reviewsPath = join(dirname(fileURLToPath(
    import.meta.url)), "../data");
console.log(reviewsPath)

const reviewsPathJSON = join(reviewsPath, "reviews.json");

export const getReviews = () => readJSON(reviewsPathJSON);

export const writeReviews = (content) => writeJSON(reviewsPathJSON, content);