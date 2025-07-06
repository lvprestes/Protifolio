import express from "express";
import { changeVisibility, getCompanyData, getCompanyJobApplicants, getCompanyPostedJobs, loginCompany, postJob, registerCompany } from "../controllers/companyController.js";
import { changeJobApplicationStatus } from './../controllers/companyController.js';
import upload from "../config/multer.js";
import { protectCompany } from "../middlewares/authMiddleware.js";

const companyRoutes = express.Router();

// Create company
companyRoutes.post('/register', upload.single('image'), registerCompany);

// Login
companyRoutes.post('/login', loginCompany);

// Read
companyRoutes.get('/company', protectCompany, getCompanyData);

// Create job
companyRoutes.post('/post-job', protectCompany, postJob);

// Read job applicants data
companyRoutes.get('/applicants', protectCompany, getCompanyJobApplicants);

// Read company posted jobs
companyRoutes.get('/list-jobs', protectCompany, getCompanyPostedJobs);

// Change job applications status
companyRoutes.post('/change-status', protectCompany, changeJobApplicationStatus);

// Change job visibility
companyRoutes.post('/change-visibility', protectCompany, changeVisibility);

export default companyRoutes;
