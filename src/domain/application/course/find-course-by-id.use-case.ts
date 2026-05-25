import { CourseEntity } from "@domain/models/entities/course.entity";
import { FindCourseByIdPort } from "@ports/in/course/find-course-by-id.port";
import { CoursePersistencePort } from "@ports/out/persistence/course.persistence";
import { inject, injectable } from "tsyringe";

@injectable()
export class FindCourseByIdUseCase implements FindCourseByIdPort {
  constructor(
    @inject('CoursePersistencePort')
    private readonly coursePersistencePort: CoursePersistencePort
  ) {}

  async findCourseById(courseId: string): Promise<CourseEntity | null> {
    return this.coursePersistencePort.findById(courseId);
  }
}
