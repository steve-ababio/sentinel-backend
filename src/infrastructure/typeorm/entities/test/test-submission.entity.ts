import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { BaseEntity } from "../base/base.entity";
import { User } from "../user/user.entity";
import { Test } from "./test.entity";

@Entity('test_submissions')
export class TestSubmission extends BaseEntity {
  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user!: User;

  @Column({ name: 'user_id' })
  userId!: string;

  @ManyToOne(() => Test, (t) => t.submissions, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'test_id' })
  test!: Test;

  @Column({ name: 'test_id' })
  testId!: string;

  @Column('float')
  score!: number; // Percentage score (e.g. 0 to 100)

  @Column('jsonb', { default: {} })
  answers!: Record<string, string>; // Map of questionId -> optionId
}
