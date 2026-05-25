import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { BaseEntity } from "../base/base.entity";
import { Course } from "../course/course.entity";
import { Lesson } from "../lesson/lesson.entity";

@Entity('module')
export class Module extends BaseEntity {
  @Column()
  title!: string;

  @Column()
  order!: number;

  @Column()
  estimatedTime!: string; // "1 hour to complete"

  @Column('text', { nullable: true })
  moduleDetails!: string; // Detailed breakdown of module content

  @ManyToOne(() => Course, (c) => c.modules, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'course_id' })
  course!: Course;

  @OneToMany(() => Lesson, (l) => l.module)
  lessons!: Lesson[];
}