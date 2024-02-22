export class ResumesRepository {
  constructor(prisma) {
    this.prisma = prisma;
  }

  createResume = async (userId, title, aboutMe) => {
    const createdResume = await this.prisma.resumes.create({
      data: {
        userId,
        title,
        aboutMe,
      },
    });
    return createdResume;
  };

  findAllResumes = async () => {
    const resumes = await this.prisma.resumes.findMany();

    return resumes;
  };

  findResumeById = async (resumeId) => {
    const resume = await this.prisma.resumes.findUnique({
      where: { resumeId: +resumeId },
    });

    return resume;
  };

  updateResume = async (resumeId, title, aboutMe, authorName, status) => {
    const updateResume = await this.prisma.resumes.update({
      where: { resumeId: +resumeId },
      data: {
        title,
        aboutMe,
        authorName,
        status,
      },
    });

    return updateResume;
  };

  deleteResume = async (resumeId) => {
    const deleteResume = await this.prisma.resumes.delete({
      where: { resumeId: +resumeId },
    });

    return deleteResume;
  };
}
