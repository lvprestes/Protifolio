import bcrypt from 'bcrypt';
import Company from './../models/Company.js';
import { v2 as cloudinary } from 'cloudinary';
import generateToken from '../utils/generateToken.js';
import Job from '../models/Job.js';
import JobApplication from './../models/JobApplications.js';

// Create company
export const registerCompany = async (req, res) => {
  const { name, email, password } = req.body;
  const imageFile = req.file;

  if (!name || !email || !password || !imageFile) {
    return res.json({ success: false, message: "Missing details" });
  }

  try {
    const companyExists = await Company.findOne({ email });
    if (companyExists) {
      return res.json({ success: false, message: "Company already registered" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const imageUpload = await cloudinary.uploader.upload(imageFile.path);
    const company = await Company.create({ name, email, password: hashPassword, image: imageUpload.secure_url });

    res.json({ success: true, company: { _id: company._id, name: company.name, email: company.email, image: company.image }, token: generateToken(company._id) });
  } catch (error) {
    res.json({ success: false, message: "Register company error: " + error.message });
  }
};

// Login
export const loginCompany = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: "Email and password are required" });
  }

  try {
    const company = await Company.findOne({ email });
    if (!company) {
      return res.json({ success: false, message: "Invalid email or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, company.password);
    if (!isPasswordValid) {
      return res.json({ success: false, message: "Invalid email or password" });
    }

    return res.status(200).json({
      success: true,
      company: { _id: company._id, name: company.name, email: company.email, image: company.image },
      token: generateToken(company._id)
    });
  } catch (error) {
    return res.json({ success: false, message: `Error on company login: ${error.message}` });
  }
};

// Read
export const getCompanyData = async (req, res) => {
  try {
    //Company is defined in protectCompany middleware
    const company = req.company;
    res.json({ success: true, company })
  } catch (error) {
    res.json({ success: false, message: "Error on get company: " + error.message })
  }
};

// Create job
export const postJob = async (req, res) => {
  const { title, description, location, salary, level, category } = req.body;
  try {
    //Company is defined in protectCompany middleware
    const companyId = req.company._id;
    const newJob = new Job({ title, description, location, salary, companyId, level, category, date: Date.now() });
    await newJob.save();
    res.json({ success: true, job: newJob });
  } catch (error) {
    res.json({ success: false, message: "Error on post job: " + error.message });
  }
};

// Read job applicants
export const getCompanyJobApplicants = async (req, res) => {
  try {
    const companyId = req.company._id;
    // Find job applicants for the user and populate data
    const applications = await JobApplication.find({ companyId }).populate('userId', 'name image resume').populate('jobId', 'title location category lavel salary').exec();
    res.json({ success: true, applications });
  } catch (error) {
    res.json({ success: false, message: "Error on get company job applicants: " + error.message });
  }
};

// Read company posted jobs
export const getCompanyPostedJobs = async (req, res) => {
  try {
    //Company is defined in protectCompany middleware
    const companyId = req.company._id;
    const jobs = await Job.find({ companyId });

    const jobsData = await Promise.all(jobs.map(async (job) => {
      const applicants = await JobApplication.find({ jobId: job._id });
      return { ...job.toObject(), applicants: applicants.length };
    }));
    res.json({ success: true, jobsData });
  } catch (error) {
    res.json({ success: false, message: "Error on get company posted jobs: " + error.message });
  }
};

// Change job applications status
export const changeJobApplicationStatus = async (req, res) => {
  const { id, status } = req.body;
  try {
    // Find job application data and update status
    await JobApplication.findOneAndUpdate({ _id: id }, { status });
    res.json({ success: true, message: 'Status changed' });
  } catch (error) {
    res.json({ success: false, message: 'Error on update application status: ' + error.message });
  }
};

// Change job visibility
export const changeVisibility = async (req, res) => {
  try {
    const { id } = req.body;
    const companyId = req.company._id;
    const job = await Job.findById(id);
    if (companyId.toString() === job.companyId.toString()) {
      job.visible = !job.visible;
    }
    await job.save();
    res.json({ success: true, job });
  } catch (error) {
    res.json({ success: false, message: "Error on change job visibility: " + error.message });
  }
};