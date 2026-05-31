import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany } from "typeorm";
import { BaseEntity } from "../base/base.entity";
import { Module } from "../module/module.entity";
import { Resource } from "../file/file.entity";
import { Progress } from "../progress/progress.entity";

@Entity('lessons')
export class Lesson extends BaseEntity {
  @Column()
  title!: string;

  @Column()
  videoUrl!: string;

  @Column('text', { nullable: true })
  notes!: string;

  @Column()
  order!: number;

  @Column({type:"text"})
  description!: string;

  @Column({ type: 'int'})
  duration!: number;
  
  @ManyToOne(() => Module, (m) => m.lessons, { onDelete: 'CASCADE' })
  @JoinColumn({name: "module_id"})
  module!: Module;

  @OneToMany(() => Progress, (p) => p.lesson)
  progress!: Progress[];
  
  @ManyToMany(
    () => Resource,
    (resource) => resource.lesson,
    {nullable: true}
)
  @JoinTable()
  public resource!: Resource[] | null; 
  
}