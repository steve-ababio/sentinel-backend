import { CourseEntity } from "@domain/models/entities/course.entity";
import { FindAllCoursesPort } from "@ports/in/course/find-all-courses.port";
import { CourseParams, CoursePersistencePort } from "@ports/out/persistence/course.persistence";
import { inject, injectable } from "tsyringe";

@injectable()
export class FindAllCoursesUseCase implements FindAllCoursesPort {
  constructor(
    @inject('CoursePersistencePort')
    private readonly coursePersistencePort: CoursePersistencePort
  ) {}

  async findAllCourses(params?: CourseParams): Promise<CourseEntity[]> {
    return this.coursePersistencePort.findAll(params);
  }
}
