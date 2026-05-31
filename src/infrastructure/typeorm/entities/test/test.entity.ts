import { Column, Entity, JoinColumn, OneToOne, OneToMany } from "typeorm";
import { BaseEntity } from "../base/base.entity";
import { Module } from "../module/module.entity";
import { Question } from "../question/question.entity";
import { TestSubmission } from "./test-submission.entity";

@Entity('tests')
export class Test extends BaseEntity {
  @Column()
  title!: string;

  @Column({ name: 'time_limit', type: 'int', default: 30 })
  timeLimit!: number; // limit in minutes

  @Column({ name: 'allowed_attempts', type: 'int', default: 3 })
  allowedAttempts!: number;

  @Column({ name: 'module_id' })
  moduleId!: string;

  @OneToOne(() => Module, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'module_id' })
  module!: Module;

  @OneToMany(() => Question, (q) => q.test, { cascade: true })
  questions!: Question[];

  @OneToMany(() => TestSubmission, (s) => s.test, { cascade: true })
  submissions!: TestSubmission[];
}
