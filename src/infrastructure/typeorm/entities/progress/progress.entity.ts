import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Lesson } from "../lesson/lesson.entity";
import { User } from "../user/user.entity";
import { BaseEntity } from "../base/base.entity";
import { Course } from "../course/course.entity";

@Index(['user', 'lesson'], { unique: true })
@Entity('progress')
export class Progress extends BaseEntity {
  
  @Index() 
  @ManyToOne(() => User)
  @JoinColumn({name: "user_id"})
  user!: User;

  @ManyToOne(() => Lesson, (lesson) => lesson.progress)
  @JoinColumn({name: "lesson_id"})
  lesson!: Lesson;

  @Column({ default: false })
  completed!: boolean;

  @Column({ name: 'last_position', type: 'float', default: 0 })
  lastPosition!: number; // seconds

}