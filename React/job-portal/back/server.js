import './config/instrument.js';
import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/db.js';
import * as Sentry from "@sentry/node";
import { clerkWebhooks } from './controllers/webhooks.js';
import companyRoutes from './routes/companyRoutes.js';
import connectCloudinary from './config/cloudinary.js';
import jobRoutes from './routes/jobRoutes.js';
import userRoutes from './routes/userRoutes.js';
import {clerkMiddleware} from '@clerk/express';

//Initialize express
const app = express();

//Connect to database
await connectDB();
await connectCloudinary();

//Middlewares
app.use(cors());
app.use(express.json());
app.use(clerkMiddleware());

// Connection test
app.get('/', (req, res) => res.status(200).send({ sucess: true }));

// Clerk hooks
app.post('/webhooks', clerkWebhooks);

// Company routes
app.use('/api/company', companyRoutes);

//Job routes
app.use('/api/jobs', jobRoutes);

//User routes
app.use('/api/users', userRoutes);

// Sentry
Sentry.setupExpressErrorHandler(app);

// Port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});