export class ResumesService {
  constructor(resumesRepository) {
    this.resumesRepository = resumesRepository;
  }

  createResume = async (title, aboutMe, authorName) => {
    const createResume = await this.resumesRepository.createResume(
      title,
      aboutMe,
      authorName,
    );

    return {
      resumeId: createResume.resumeId,
      userId: createResume.userId,
      title: createResume.title,
      aboutMe: createResume.aboutMe,
      authorName: createResume.authorName,
      createdAt: createResume.createdAt,
      updatedAt: createResume.updatedAt,
    };
  };

  findAllResumes = async () => {
    const resumes = await this.resumesRepository.findAllResumes();

    resumes.sort((a, b) => {
      return b.createdAt - a.createdAt;
    });

    return resumes.map((resume) => {
      return {
        resumeId: resume.resumeId,
        userId: resume.userId,
        title: resume.title,
        aboutMe: resume.aboutMe,
        authorName: resume.authorName,
        createdAt: resume.createdAt,
        updatedAt: resume.updatedAt,
      };
    });
  };

  findResumeById = async (resumeId) => {
    const resume = await this.resumesRepository.findResumeById(resumeId);

    return {
      resumeId: resume.resumeId,
      userId: resume.userId,
      title: resume.title,
      aboutMe: resume.aboutMe,
      authorName: resume.authorName,
      createdAt: resume.createdAt,
      updatedAt: resume.updatedAt,
    };
  };

  updateResume = async (resumeId, title, aboutMe, authorName, status) => {
    const resume = await this.resumesRepository.findResumeById(resumeId);

    if (!resume) throw new Error("존재하지 않는 이력서입니다.");

    await this.resumesRepository.updateResume(
      resumeId,
      title,
      aboutMe,
      authorName,
      status,
    );

    const updatedResume = await this.resumesRepository.findResumeById(resumeId);

    return {
      resumeId: updatedResume.resumeId,
      userId: updatedResume.userId,
      title: updatedResume.title,
      aboutMe: updatedResume.aboutMe,
      authorName: updatedResume.authorName,
      createdAt: updatedResume.createdAt,
      updatedAt: updatedResume.updatedAt,
    };
  };

  deleteResume = async (resumeId) => {
    const resume = await this.resumesRepository.findResumeById(resumeId);

    if (!resume) throw new Error("존재하지 않는 이력서입니다.");

    await this.resumesRepository.deleteResume(resumeId);

    return {
      resumeId: resume.resumeId,
      userId: resume.userId,
      title: resume.title,
      aboutMe: resume.aboutMe,
      authorName: resume.authorName,
      createdAt: resume.createdAt,
      updatedAt: resume.updatedAt,
    };
  };
}
