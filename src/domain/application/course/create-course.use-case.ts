import { CourseEntity } from "@domain/models/entities/course.entity";
import { CreateCoursePort } from "@ports/in/course/create-course.port";
import { CoursePersistencePort } from "@ports/out/persistence/course.persistence";
import { inject, injectable } from "tsyringe";

@injectable()
export class CreateCourseUseCase implements CreateCoursePort {
  constructor(
    @inject('CoursePersistencePort')
    private readonly coursePersistencePort: CoursePersistencePort
  ) {}

  async createCourse(course: CourseEntity): Promise<CourseEntity> {
    return this.coursePersistencePort.create(course);
  }
}
