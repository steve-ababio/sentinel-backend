import { Column, Entity, ManyToOne, OneToMany, JoinColumn } from "typeorm";
import { BaseEntity } from "../base/base.entity";
import { Module } from "../module/module.entity";
import { Enrollment } from "../enrollment/enrollment.entity";
import { CourseLevel, PricingModel } from "@common/global/types";
import { Progress } from "../progress/progress.entity";
import { Instructor } from "../instructor/instructor.entity";

@Entity('course')
export class Course extends BaseEntity {
  @Column()
  title!: string;

  @Column({type:'text',nullable:true})
  description!: string;

  @Column({type:'simple-array',nullable:true})
  skillsGained!: string[]; // ["Understanding of Wealth", "Money", "Entrepreneurship"]

  @Column({type:'simple-array',nullable:true})
  expectedExperience?:string[]

  @Column({type:'varchar'})
  thumbnail!: string;

  @Column({ default: false })
  isPopular!: boolean;

  @Column({default:"Sentinel Prime K"})
  provider!: string;

  @Column({type:"enum",enum:PricingModel})
  pricingModel!:PricingModel

  @Column({ type: 'int',nullable:true})
  price!: number;


  @Column({ nullable: true })
  specialization!: string; // "Introduction to Scripting in Python Specialization"

  @Column({ default: 0 })
  enrolledCount!: number; // 1,273 already enrolled

  @Column({
    type:"enum",
    enum:CourseLevel
  })
  difficulty!: CourseLevel; // "Beginner Level"

  @Column({type:"integer",nullable:true})
  approvalRate!: number; // 96% liked this course

  @Column({type:'simple-array',nullable:true})
  languages!:string[]
  // Relations
  @OneToMany(() => Module, (m) => m.course)
  modules!: Module[];

  @OneToMany(() => Enrollment, (e) => e.course)
  enrollments!: Enrollment[];

  @OneToMany(() => Progress, (p) => p.lesson)
  progress!: Progress[];

  @ManyToOne(() => Instructor, { nullable: true })
  @JoinColumn({ name: "instructor_id" })
  instructor?: Instructor;

}