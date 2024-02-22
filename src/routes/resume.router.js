import express from "express";
import { prisma } from "../utils/prisma/index.js";
import { ResumesRepository } from "../repositories/resums.repository.js";
import { ResumesService } from "../services/resume.service.js";
import { ResumesController } from "../controllers/resumes.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();
const resumesRepository = new ResumesRepository(prisma);
const resumesService = new ResumesService(resumesRepository);
const resumesController = new ResumesController(resumesService);

//이력서 생성 API
router.post("/", authMiddleware, resumesController.createResume);

//이력서 조회 API
router.get("/", authMiddleware, resumesController.getResumes);

//이력서 상세 조회 API
router.get("/:resumeId", resumesController.getResumeById);

//이력서 수정 API
router.patch("/:resumeId", resumesController.updateResume);

//이력서 삭제 API
router.delete("/:resumeId", resumesController.deleteResume);

export default router;
