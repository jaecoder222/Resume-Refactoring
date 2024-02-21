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
router.post("/", resumesController.createResume);

//이력서 조회 API
router.get("/", resumesController.getResumes);

//이력서 상세 조회 API
router.get("/:resumeId", resumesController.getResumeById);

//이력서 수정 API
router.patch("/resumeId", resumesController.updateResume);

//이력서 삭제 API
router.delete("/resumeId", resumesController.deleteResume);

// router.post("/resumes", authMiddleware, async (req, res, next) => {
//   const { title, aboutMe } = req.body;
//   const { userId } = req.user;

//   if (!userId) return res.status(400).json({ message: "로그인이 필요합니다." });

//   const resume = await prisma.resumes.create({
//     data: {
//       userId: +userId,
//       title,
//       aboutMe,
//       status: "APPLY",
//     },
//   });

//   return res.status(201).json({ message: "이력서가 생성되었습니다." });
// });

// router.get("/resumes", authMiddleware, async (req, res, next) => {
//   const { userId } = req.user;
//   if (userId) {
//     const resume = await prisma.resumes.findMany({
//       where: { userId: +userId },
//       select: {
//         resumeId: true,
//         title: true,
//         aboutMe: true,
//         authorName: true,
//         status: true,
//         createdAt: true,
//         updatedAt: true,
//       },
//       orderBy: {
//         createdAt: "desc",
//       },
//     });

//     return res.status(200).json({ data: resume });
//   }
// });

// router.get("/resumes/:resumesId", authMiddleware, async (req, res, next) => {
//   const { resumesId } = req.params;
//   const { userId } = req.user;

//   const resume = await prisma.resumes.findFirst({
//     where: { resumeId: +resumesId, userId: +userId },
//     select: {
//       resumeId: true,
//       userId: true,
//       title: true,
//       aboutMe: true,
//       authorName: true,
//       status: true,
//       createdAt: true,
//       updatedAt: true,
//     },
//   });

//   return res.status(200).json({ data: resume });
// });

// router.patch("/resumes/:resumesId", authMiddleware, async (req, res, next) => {
//   const { title, aboutMe, authorName, status } = req.body;
//   const { resumesId } = req.params;
//   const { userId } = req.user;
//   console.log(userId);

//   const resume = await prisma.resumes.findFirst({
//     where: { resumeId: +resumesId },
//   });
//   console.log(resume);

//   const users = await prisma.users.findFirst({
//     where: { userId: +userId },
//   });
//   console.log(users);
//   console.log(users.grade);

//   if (!users) return res.status(401).json({ message: "수정 권한이 없습니다." });

//   if (userId !== resume.userId && users.grade === "user") {
//     return res.status(401).json({ message: "이력서 작성자가 아닙니다." });
//   } else if (userId === resume.userId || users.grade === "admin") {
//     const update = await prisma.resumes.update({
//       where: { resumeId: +resumesId },
//       data: {
//         title,
//         aboutMe,
//         authorName,
//         status,
//       },
//     });

//     return res.status(200).json({ data: update });
//   }
// });

// router.delete("/resumes/:resumesId", authMiddleware, async (req, res, next) => {
//   const { resumesId } = req.params;
//   const { userId } = req.user;

//   const users = await prisma.users.findFirst({
//     where: { userId: +userId },
//   });

//   if (!users)
//     return res.status(401).json({ message: "삭제할 권한이 없습니다." });

//   const deleteResume = await prisma.resumes.delete({
//     where: { resumeId: +resumesId },
//   });

//   return res.status(200).json({ message: "이력서가 삭제되었습니다." });
// });

export default router;
