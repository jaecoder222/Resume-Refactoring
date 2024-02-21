import express from "express";
import UserRouter from "./user.router.js";
import ResumeRouter from "./resume.router.js";

const router = express.Router();

router.use("/users/", UserRouter);
router.use("/resumes/", ResumeRouter);

export default router;
