import { Column, Entity, ManyToMany } from "typeorm";
import { BaseEntity } from "../base/base.entity";
import { FileMimeType, FileType } from "@common/global/types";
import { Lesson } from "../lesson/lesson.entity";

@Entity({name: 'resource'})
export class Resource extends BaseEntity {

    @Column({
        name: 'filename',
        type: 'varchar',
        length: 255,
    })
    public filename!: string;

    @Column({
        name: 'type',
        type: 'enum',
        enum: FileType,
    })
    public type!: FileType;

    @Column({
        name: 'url',
        type: 'text',
    })
    public url!: string;

    @Column({
        name: 'mime_type',
        type: "enum",
        enum: FileMimeType,
        default: FileMimeType.IMAGE_JPEG
    })
    public mimeType!: FileMimeType | null;

    @Column({
        name: 'readonly',
        type: 'boolean',
        default: false,
    })
    public readonly!: boolean;

    @ManyToMany(
        () => Lesson,
        (lesson) => lesson.resource,
        {nullable: true}
    )
    public lesson!: Lesson[] | null;
}