"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InstructorEntity = void 0;
class InstructorEntity {
    constructor(email, firstName, lastName, profilePicture, role, specialization, phoneNumber, bio, id, averageRating, reviewCount, coursesCount) {
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.profilePicture = profilePicture;
        this.role = role;
        this.specialization = specialization;
        this.phoneNumber = phoneNumber;
        this.bio = bio;
        this.id = id;
        this.averageRating = averageRating;
        this.reviewCount = reviewCount;
        this.coursesCount = coursesCount;
    }
}
exports.InstructorEntity = InstructorEntity;
