import { CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn, Index } from 'typeorm';

export abstract class BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Index()
  public id!: string;

    @CreateDateColumn({name: 'created_at', type: 'timestamptz'})
    public createdAt!: Date;

    @UpdateDateColumn({name: 'updated_at', type: 'timestamptz'})
    public updatedAt!: Date;

}