import { addSong, listSongs } from "../controllers/songController.js";
import express from 'express';
import upload from "../middleware/multer.js";

const songRouter = express.Router();

songRouter.get('/list', listSongs);
songRouter.post('/add', upload.fields([{ name: 'image', maxCount: 1 }, { name: "audio", maxCount: 1 }]), addSong);

export default songRouter;