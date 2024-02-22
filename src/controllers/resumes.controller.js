export class ResumesController {
  constructor(resumesService) {
    this.resumesService = resumesService;
  }

  // 이력서 생성 API
  createResume = async (req, res, next) => {
    try {
      const { userId } = req.user;
      const { title, aboutMe } = req.body;

      if (!title) throw new Error("title은 필수 값입니다.");
      if (!aboutMe) throw new Error("aboutMe는 필수 값입니다.");

      const createdResume = await this.resumesService.createResume(
        userId,
        title,
        aboutMe,
      );

      return res.status(201).json({ data: createdResume });
    } catch (err) {
      next(err);
    }
  };

  //이력서 조회 API
  getResumes = async (req, res, next) => {
    try {
      const resume = await this.resumesService.findAllResumes();

      return res.status(200).json({ data: resume });
    } catch (err) {
      next(err);
    }
  };

  //이력서 상세 조회 API
  getResumeById = async (req, res, next) => {
    try {
      const { resumeId } = req.params;
      const resume = await this.resumesService.findResumeById(resumeId);

      return res.status(200).json({ data: resume });
    } catch (err) {
      next(err);
    }
  };

  //이력서 수정 API
  updateResume = async (req, res, next) => {
    try {
      const { resumeId } = req.params;
      const { title, aboutMe, authorName, status } = req.body;

      const updatedResume = await this.resumesService.updateResume(
        resumeId,
        title,
        aboutMe,
        authorName,
        status,
      );

      return res.status(200).json({ data: updatedResume });
    } catch (err) {
      next(err);
    }
  };

  //이력서 삭제 API
  deleteResume = async (req, res, next) => {
    try {
      const { resumeId } = req.params;

      const deleteResume = await this.resumesService.deleteResume(resumeId);

      return res.status(200).json({ data: deleteResume });
    } catch (err) {
      next(err);
    }
  };
}
