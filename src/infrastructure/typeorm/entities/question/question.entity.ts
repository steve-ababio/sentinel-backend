import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { BaseEntity } from "../base/base.entity";
import { Test } from "../test/test.entity";

export interface AnswerOption {
  id: string;
  text: string;
  points: number;
  isCorrect: boolean;
}

@Entity('questions')
export class Question extends BaseEntity {
  @Column('text')
  text!: string;

  @Column('jsonb', { default: [] })
  options!: AnswerOption[];

  @Column({ name: 'test_id' })
  testId!: string;

  @ManyToOne(() => Test, (t) => t.questions, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'test_id' })
  test!: Test;
}
