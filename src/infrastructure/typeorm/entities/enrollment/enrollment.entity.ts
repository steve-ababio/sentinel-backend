import { Column, CreateDateColumn, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { BaseEntity } from "../base/base.entity";
import { User } from "../user/user.entity";
import { Course } from "../course/course.entity";
import { EnrollmentStatus } from "@common/global/types";

@Entity('enrollment')
export class Enrollment extends BaseEntity {;
  @Index() 
  @ManyToOne(() => User)
    @JoinColumn({name: "user_id"})
  user!: User;

  @ManyToOne(() => Course, (c) => c.enrollments)
  @JoinColumn({name: "course_id"})
  course!: Course;

  @Column({
    type: 'enum',
    enum: EnrollmentStatus,
    default: EnrollmentStatus.ACTIVE,
  })
  status!: EnrollmentStatus;
}