"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResourceEntity = void 0;
class ResourceEntity {
    constructor(id, filename, type, url, mimeType, readonly) {
        this.id = id;
        this.filename = filename;
        this.type = type;
        this.url = url;
        this.mimeType = mimeType;
        this.readonly = readonly;
    }
}
exports.ResourceEntity = ResourceEntity;
