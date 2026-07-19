"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModuleEntity = void 0;
class ModuleEntity {
    constructor(title, order, lessons, estimatedTime, moduleDetails, courseId, id, test) {
        this.title = title;
        this.order = order;
        this.lessons = lessons;
        this.estimatedTime = estimatedTime;
        this.moduleDetails = moduleDetails;
        this.courseId = courseId;
        this.id = id;
        this.test = test;
    }
}
exports.ModuleEntity = ModuleEntity;
