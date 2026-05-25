import { BaseResponse } from "@common/global/types";
import { CourseEntity } from "@domain/models/entities/course.entity";
import { UpdateCoursePort } from "@ports/in/course/update-course.port";
import { CoursePersistencePort } from "@ports/out/persistence/course.persistence";
import { inject, injectable } from "tsyringe";

@injectable()
export class UpdateCourseUseCase implements UpdateCoursePort {
  constructor(
    @inject('CoursePersistencePort')
    private readonly coursePersistencePort: CoursePersistencePort
  ) {}

  async updateCourse(course: CourseEntity): Promise<BaseResponse> {
    return this.coursePersistencePort.update(course);
  }
}
