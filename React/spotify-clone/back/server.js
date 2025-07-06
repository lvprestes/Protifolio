import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import songRouter from './src/routes/songRoutes.js';
import connectDB from './src/config/mongodb.js';
import connectCloudinary from './src/config/cloudinary.js';

// App config
const app = express();
const port = process.env.PORT || 4000;

// Middlewares
app.use(express.json());
app.use(cors());
connectDB();
connectCloudinary();

// Initializing routes
app.use('/api/song', songRouter);

app.get('/', (req, res) => {res.send("API WORKING")});

app.listen(port, () => console.log(`Server started on ${port}`));