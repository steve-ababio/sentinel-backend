import { BaseResponse } from "@common/global/types";
import { DeleteCoursePort } from "@ports/in/course/delete-course.port";
import { CoursePersistencePort } from "@ports/out/persistence/course.persistence";
import { inject, injectable } from "tsyringe";

@injectable()
export class DeleteCourseUseCase implements DeleteCoursePort {
  constructor(
    @inject('CoursePersistencePort')
    private readonly coursePersistencePort: CoursePersistencePort
  ) {}

  async deleteCourse(courseId: string): Promise<BaseResponse> {
    return this.coursePersistencePort.delete(courseId);
  }
}
