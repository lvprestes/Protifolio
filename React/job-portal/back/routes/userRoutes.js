import express from 'express';
import { applyForJob, getUserApplications, getUserData, updateUserResume } from '../controllers/userController.js';
import upload from './../config/multer.js';

const userRoutes = express.Router();

// Get user data
userRoutes.get('/user', getUserData);

// Apply for a job
userRoutes.post('/apply', applyForJob);

// Get applied jobs data
userRoutes.get('/applications', getUserApplications);

// Update user profile
userRoutes.post('/update-resume', upload.single('resume'), updateUserResume);

export default userRoutes;