"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LessonEntity = void 0;
class LessonEntity {
    constructor(title, videoUrl, notes, order, description, duration, id, moduleId, resources) {
        this.title = title;
        this.videoUrl = videoUrl;
        this.notes = notes;
        this.order = order;
        this.description = description;
        this.duration = duration;
        this.id = id;
        this.moduleId = moduleId;
        this.resources = resources;
    }
}
exports.LessonEntity = LessonEntity;
