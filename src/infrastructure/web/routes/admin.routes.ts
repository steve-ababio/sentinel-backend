import Router from "koa-router";
import { container } from "tsyringe";
import { Between, In } from "typeorm";
import { manager } from "@infrastructure/typeorm/data-source";
import { Enrollment } from "@infrastructure/typeorm/entities/enrollment/enrollment.entity";
import { Transaction } from "@infrastructure/typeorm/entities/transaction/transaction.entity";
import { Course } from "@infrastructure/typeorm/entities/course/course.entity";
import { UserInfo } from "@infrastructure/typeorm/entities/user-info/user-info.entity";
import { Instructor } from "@infrastructure/typeorm/entities/instructor/instructor.entity";
import { Module } from "@infrastructure/typeorm/entities/module/module.entity";
import { Lesson } from "@infrastructure/typeorm/entities/lesson/lesson.entity";
import { Test } from "@infrastructure/typeorm/entities/test/test.entity";
import { Question } from "@infrastructure/typeorm/entities/question/question.entity";
import { Progress } from "@infrastructure/typeorm/entities/progress/progress.entity";
import { AdminMiddleware } from "../middleware/middleware";
import { Review } from "@infrastructure/typeorm/entities/review/review.entity";
import Koa from "koa";
import fs from "fs";
import path from "path";
import { EntityType, TransactionStatus } from "@common/global/types";

const adminRouter = new Router();
const adminMiddleware = container.resolve(AdminMiddleware);
const adminGuard = adminMiddleware.adminGuard.bind(adminMiddleware);

// Helper to get formatted student name from userId
async function getUserFullNamesMap() {
    const userInfos = await manager.find(UserInfo, { relations: ["user"] });
    const map = new Map<string, string>();
    for (const info of userInfos) {
        if (info.user?.id) {
            map.set(info.user.id, `${info.firstName} ${info.lastName}`.trim());
        }
    }
    return map;
}

adminRouter.get("/overview", adminGuard, async (ctx: Koa.Context) => {
    try {
        const preset = ctx.query.preset || "6months";
        let endDate = new Date();
        let startDate = new Date();

        if (preset === "30days") {
            startDate = new Date(endDate.getTime() - 30 * 24 * 60 * 60 * 1000);
        } else if (preset === "6months") {
            startDate = new Date();
            startDate.setMonth(startDate.getMonth() - 6);
        } else if (preset === "ytd") {
            startDate = new Date(endDate.getFullYear(), 0, 1);
        } else if (preset === "custom") {
            if (ctx.query.startDate && ctx.query.endDate) {
                startDate = new Date(ctx.query.startDate as string);
                endDate = new Date(ctx.query.endDate as string);
            } else {
                startDate = new Date();
                startDate.setMonth(startDate.getMonth() - 6);
            }
        } else {
            startDate = new Date();
            startDate.setMonth(startDate.getMonth() - 6);
        }

        // Ensure dates are valid
        if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
            endDate = new Date();
            startDate = new Date();
            startDate.setMonth(startDate.getMonth() - 6);
        }

        const durationMs = endDate.getTime() - startDate.getTime();
        const prevEndDate = startDate;
        const prevStartDate = new Date(startDate.getTime() - durationMs);

        // 1. Total Enrollments & Trend
        const currentTotalEnrollments = await manager.count(Enrollment, {
            where: { createdAt: Between(new Date(0), endDate) }
        });
        const prevTotalEnrollments = await manager.count(Enrollment, {
            where: { createdAt: Between(new Date(0), prevEndDate) }
        });
        const newEnrollmentsCurrent = await manager.count(Enrollment, {
            where: { createdAt: Between(startDate, endDate) }
        });
        const newEnrollmentsPrev = await manager.count(Enrollment, {
            where: { createdAt: Between(prevStartDate, prevEndDate) }
        });
        const enrollmentsChangeRate = newEnrollmentsPrev > 0
            ? Math.round(((newEnrollmentsCurrent - newEnrollmentsPrev) / newEnrollmentsPrev) * 100)
            : (newEnrollmentsCurrent > 0 ? 100 : 0);

        // 2. Completion Rate & Trend
        const currentCompleted = await manager.count(Enrollment, {
            where: { status: "completed" as any, createdAt: Between(new Date(0), endDate) }
        });
        const currentRate = currentTotalEnrollments > 0 ? (currentCompleted / currentTotalEnrollments) * 100 : 0;

        const prevCompleted = await manager.count(Enrollment, {
            where: { status: "completed" as any, createdAt: Between(new Date(0), prevEndDate) }
        });
        const prevRate = prevTotalEnrollments > 0 ? (prevCompleted / prevTotalEnrollments) * 100 : 0;

        const completionRate = parseFloat(currentRate.toFixed(1));
        const completionChangeRate = parseFloat((currentRate - prevRate).toFixed(1));

        // 3. Active Courses & Trend
        const currentTotalCourses = await manager.count(Course, {
            where: { createdAt: Between(new Date(0), endDate) }
        });
        const newCoursesCurrent = await manager.count(Course, {
            where: { createdAt: Between(startDate, endDate) }
        });
        const newCoursesPrev = await manager.count(Course, {
            where: { createdAt: Between(prevStartDate, prevEndDate) }
        });
        const coursesChangeRate = newCoursesPrev > 0
            ? Math.round(((newCoursesCurrent - newCoursesPrev) / newCoursesPrev) * 100)
            : (newCoursesCurrent > 0 ? 100 : 0);

        // 4. Total Revenue & Trend
        const currentTxs = await manager.find(Transaction, {
            where: { status: "success" as any, createdAt: Between(new Date(0), endDate) }
        });
        const currentTotalRevenue = currentTxs.reduce((sum, t) => sum + (t.amount || 0), 0);

        const periodTxsCurrent = await manager.find(Transaction, {
            where: { status: "success" as any, createdAt: Between(startDate, endDate) }
        });
        const newRevenueCurrent = periodTxsCurrent.reduce((sum, t) => sum + (t.amount || 0), 0);

        const periodTxsPrev = await manager.find(Transaction, {
            where: { status: "success" as any, createdAt: Between(prevStartDate, prevEndDate) }
        });
        const newRevenuePrev = periodTxsPrev.reduce((sum, t) => sum + (t.amount || 0), 0);

        const revenueChangeRate = newRevenuePrev > 0
            ? Math.round(((newRevenueCurrent - newRevenuePrev) / newRevenuePrev) * 100)
            : (newRevenueCurrent > 0 ? 100 : 0);

        // 5. Enrollment Trends Graph Data
        const enrollments = await manager.find(Enrollment, {
            where: { createdAt: Between(startDate, endDate) },
            order: { createdAt: "ASC" }
        });

        const diffDays = Math.ceil(durationMs / (24 * 60 * 60 * 1000));
        const trendData: { name: string; value: number }[] = [];
        const keyMap = new Map<string, number>();

        if (diffDays <= 31) {
            // Group by day
            let current = new Date(startDate.getTime());
            while (current <= endDate) {
                const name = current.toLocaleDateString("en-US", { month: "short", day: "numeric" });
                if (!keyMap.has(name)) {
                    keyMap.set(name, trendData.length);
                    trendData.push({ name, value: 0 });
                }
                current.setDate(current.getDate() + 1);
            }

            for (const e of enrollments) {
                const name = e.createdAt.toLocaleDateString("en-US", { month: "short", day: "numeric" });
                const idx = keyMap.get(name);
                if (idx !== undefined) {
                    trendData[idx].value += 1;
                }
            }
        } else {
            // Group by month
            let current = new Date(startDate.getFullYear(), startDate.getMonth(), 1);
            const targetEnd = new Date(endDate.getFullYear(), endDate.getMonth(), 1);
            while (current <= targetEnd) {
                const name = current.toLocaleDateString("en-US", { month: "short" });
                if (!keyMap.has(name)) {
                    keyMap.set(name, trendData.length);
                    trendData.push({ name, value: 0 });
                }
                current.setMonth(current.getMonth() + 1);
            }

            for (const e of enrollments) {
                const name = e.createdAt.toLocaleDateString("en-US", { month: "short" });
                const idx = keyMap.get(name);
                if (idx !== undefined) {
                    trendData[idx].value += 1;
                }
            }
        }

        // 6. Instructor Activity Logs
        const instructors = await manager.find(Instructor, { order: { createdAt: "DESC" }, take: 10 });
        const courses = await manager.find(Course, {
            relations: ["instructor"],
            order: { createdAt: "DESC" },
            take: 10
        });
        const modules = await manager.find(Module, {
            relations: ["course", "course.instructor"],
            order: { createdAt: "DESC" },
            take: 10
        });
        const lessons = await manager.find(Lesson, {
            relations: ["module", "module.course", "module.course.instructor"],
            order: { createdAt: "DESC" },
            take: 10
        });

        interface LogItem {
            id: string;
            actor: string;
            action: string;
            timestamp: Date;
            type: string;
        }

        const logs: LogItem[] = [];

        for (const inst of instructors) {
            logs.push({
                id: `inst-${inst.id}`,
                actor: `${inst.firstName} ${inst.lastName}`,
                action: `registered as a faculty member.`,
                timestamp: inst.createdAt,
                type: "instructor"
            });
        }

        for (const c of courses) {
            const name = c.instructor ? `${c.instructor.firstName} ${c.instructor.lastName}` : (c.provider || "System Instructor");
            logs.push({
                id: `course-${c.id}`,
                actor: name,
                action: `created course "${c.title}".`,
                timestamp: c.createdAt,
                type: "course"
            });
        }

        for (const m of modules) {
            const courseTitle = m.course?.title || "a course";
            const inst = m.course?.instructor;
            const name = inst ? `${inst.firstName} ${inst.lastName}` : (m.course?.provider || "System Instructor");
            logs.push({
                id: `module-${m.id}`,
                actor: name,
                action: `added module "${m.title}" to course "${courseTitle}".`,
                timestamp: m.createdAt,
                type: "module"
            });
        }

        for (const l of lessons) {
            const courseTitle = l.module?.course?.title || "a course";
            const inst = l.module?.course?.instructor;
            const name = inst ? `${inst.firstName} ${inst.lastName}` : (l.module?.course?.provider || "System Instructor");
            logs.push({
                id: `lesson-${l.id}`,
                actor: name,
                action: `added lesson "${l.title}" to course "${courseTitle}".`,
                timestamp: l.createdAt,
                type: "lesson"
            });
        }

        logs.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
        const instructorActivities = logs.slice(0, 10).map(l => ({
            id: l.id,
            actor: l.actor,
            action: l.action,
            timestamp: l.timestamp.toISOString(),
            type: l.type
        }));

        // 7. Recent Student Enrollments (within selected period or fallback to recent 15 overall)
        let recentEnrollmentsRaw = await manager.find(Enrollment, {
            where: { createdAt: Between(startDate, endDate) },
            relations: ["course", "user"],
            order: { createdAt: "DESC" },
            take: 15
        });

        if (recentEnrollmentsRaw.length === 0) {
            recentEnrollmentsRaw = await manager.find(Enrollment, {
                relations: ["course", "user"],
                order: { createdAt: "DESC" },
                take: 15
            });
        }

        const nameMap = await getUserFullNamesMap();
        
        // Batch fetch lessons and progress records to calculate actual completion progress
        const userIds = recentEnrollmentsRaw.map(e => e.user?.id).filter(Boolean);
        const courseIds = recentEnrollmentsRaw.map(e => e.course?.id).filter(Boolean);

        const allCourseLessons = courseIds.length > 0
            ? await manager.find(Lesson, {
                where: { module: { course: { id: In(courseIds) } } },
                relations: ["module", "module.course"]
              })
            : [];

        const lessonsByCourse = new Map<string, Lesson[]>();
        for (const l of allCourseLessons) {
            const cId = l.module?.course?.id;
            if (cId) {
                if (!lessonsByCourse.has(cId)) {
                    lessonsByCourse.set(cId, []);
                }
                lessonsByCourse.get(cId)!.push(l);
            }
        }

        const allLessonIds = allCourseLessons.map(l => l.id);
        const completedLessonsByUserAndCourse = new Map<string, Set<string>>();

        if (allLessonIds.length > 0 && userIds.length > 0) {
            const completedProgress = await manager.find(Progress, {
                where: {
                    user: { id: In(userIds) },
                    lesson: { id: In(allLessonIds) },
                    completed: true
                },
                relations: ["user", "lesson", "lesson.module", "lesson.module.course"]
            });

            for (const p of completedProgress) {
                const uId = p.user?.id;
                const cId = p.lesson?.module?.course?.id;
                if (uId && cId) {
                    const key = `${uId}_${cId}`;
                    if (!completedLessonsByUserAndCourse.has(key)) {
                        completedLessonsByUserAndCourse.set(key, new Set());
                    }
                    completedLessonsByUserAndCourse.get(key)!.add(p.lesson.id);
                }
            }
        }

        const recentEnrollments = recentEnrollmentsRaw.map(e => {
            const studentName = nameMap.get(e.user?.id) || e.user?.identifier || "Student User";
            const parts = studentName.split(/\s+/);
            const initial = `${parts[0]?.[0] || ''}${parts[1]?.[0] || ''}`.toUpperCase() || 'SU';
            
            const uId = e.user?.id;
            const cId = e.course?.id;
            const totalLessons = cId ? (lessonsByCourse.get(cId)?.length || 0) : 0;
            const completedCount = (uId && cId) 
                ? (completedLessonsByUserAndCourse.get(`${uId}_${cId}`)?.size || 0) 
                : 0;

            const progress = totalLessons > 0 
                ? Math.round((completedCount / totalLessons) * 100) 
                : 0;

            const dateString = e.createdAt.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric"
            });

            return {
                student: studentName,
                initial,
                course: e.course?.title || "Sentinel Course",
                status: e.status === "active" ? "Active" : "Completed",
                date: dateString,
                progress,
                color: "bg-indigo-100 text-indigo-700"
            };
        });

        ctx.status = 200;
        ctx.body = {
            totalEnrollments: currentTotalEnrollments,
            enrollmentsChangeRate,
            enrollmentsIsUp: enrollmentsChangeRate === 0 ? null : enrollmentsChangeRate > 0,

            completionRate,
            completionChangeRate,
            completionIsUp: completionChangeRate === 0 ? null : completionChangeRate > 0,

            activeCourses: currentTotalCourses,
            coursesChangeRate,
            coursesIsUp: coursesChangeRate === 0 ? null : coursesChangeRate > 0,

            totalRevenue: currentTotalRevenue,
            revenueChangeRate,
            revenueIsUp: revenueChangeRate === 0 ? null : revenueChangeRate > 0,

            trendData,
            instructorActivities,
            recentEnrollments
        };
    } catch (err: any) {
        console.error(err);
        ctx.status = 500;
        ctx.body = { message: err?.message || "Internal server error" };
    }
});

adminRouter.get("/analytics", adminGuard, async (ctx: Koa.Context) => {
    try {
        const period = ctx.query.period || "Last 6 Months";
        let endDate = new Date();
        let startDate = new Date();

        if (ctx.query.startDate && ctx.query.endDate) {
            const parsedStart = new Date(ctx.query.startDate as string);
            const parsedEnd = new Date(ctx.query.endDate as string);
            if (!isNaN(parsedStart.getTime()) && !isNaN(parsedEnd.getTime())) {
                startDate = parsedStart;
                startDate.setHours(0, 0, 0, 0);
                endDate = parsedEnd;
                endDate.setHours(23, 59, 59, 999);
            }
        } else if (period === "Last 30 Days") {
            startDate = new Date(endDate.getTime() - 30 * 24 * 60 * 60 * 1000);
        } else if (period === "Last 6 Months") {
            startDate = new Date();
            startDate.setMonth(startDate.getMonth() - 6);
        } else if (period === "Year to Date") {
            startDate = new Date(endDate.getFullYear(), 0, 1);
        } else {
            startDate = new Date();
            startDate.setMonth(startDate.getMonth() - 6);
        }

        const durationMs = endDate.getTime() - startDate.getTime();
        const prevEndDate = startDate;
        const prevStartDate = new Date(startDate.getTime() - durationMs);

        // 1. Cumulative Revenue & Change
        const currentTxs = await manager.find(Transaction, {
            where: { status: TransactionStatus.SUCCESS, createdAt: Between(new Date(0), endDate) },
            relations: ["course"]
        });
        const totalRevenue = currentTxs.reduce((sum, t) => sum + (t.amount || 0), 0);

        const revenueCurrentPeriod = (await manager.find(Transaction, {
            where: { status: TransactionStatus.SUCCESS, createdAt: Between(startDate, endDate) }
        })).reduce((sum, t) => sum + (t.amount || 0), 0);

        const revenuePrevPeriod = (await manager.find(Transaction, {
            where: { status: TransactionStatus.SUCCESS, createdAt: Between(prevStartDate, prevEndDate) }
        })).reduce((sum, t) => sum + (t.amount || 0), 0);

        const revenueChangeRate = revenuePrevPeriod > 0
            ? parseFloat((((revenueCurrentPeriod - revenuePrevPeriod) / revenuePrevPeriod) * 100).toFixed(1))
            : (revenueCurrentPeriod > 0 ? 100.0 : 0.0);

        // 2. Total Enrollments & Change
        const totalEnrollments = await manager.count(Enrollment, {
            where: { createdAt: Between(new Date(0), endDate) }
        });

        const enrollmentsCurrentPeriod = await manager.count(Enrollment, {
            where: { createdAt: Between(startDate, endDate) }
        });

        const enrollmentsPrevPeriod = await manager.count(Enrollment, {
            where: { createdAt: Between(prevStartDate, prevEndDate) }
        });

        const enrollmentsChangeRate = enrollmentsPrevPeriod > 0
            ? parseFloat((((enrollmentsCurrentPeriod - enrollmentsPrevPeriod) / enrollmentsPrevPeriod) * 100).toFixed(1))
            : (enrollmentsCurrentPeriod > 0 ? 100.0 : 0.0);

        // 3. Average Faculty Rating & Change
        const currentRatingVal = await manager.average(Review, 'rating', { 
            entityType: EntityType.COURSE,
            createdAt: Between(new Date(0), endDate) 
        });
        const prevRatingVal = await manager.average(Review, 'rating', { 
            entityType: EntityType.COURSE,
            createdAt: Between(new Date(0), prevEndDate) 
        });
        console.log("currentRatingVal: ",currentRatingVal);
        console.log("PreviousRating: ",prevRatingVal);

        const averageFacultyRating = currentRatingVal !== null ? parseFloat(Number(currentRatingVal).toFixed(2)) : 0;
        const prevFacultyRating = prevRatingVal !== null ? parseFloat(Number(prevRatingVal).toFixed(2)) : 0;
        const ratingDiff = averageFacultyRating - prevFacultyRating;
        
        const facultyRatingChangeRate = prevFacultyRating > 0
        ? parseFloat((((averageFacultyRating - prevFacultyRating) / prevFacultyRating) * 100).toFixed(1))
        : 0.0;

        // 4. Sales and Enrollment Trend (Widget Graph Data)
        const diffDays = Math.ceil(durationMs / (24 * 60 * 60 * 1000));
        const salesData: { month: string; revenue: number; enrollments: number }[] = [];
        const keyMap = new Map<string, number>();

        const enrollments = await manager.find(Enrollment, {
            where: { createdAt: Between(startDate, endDate) },
            order: { createdAt: "ASC" }
        });

        if (diffDays <= 31) {
            let current = new Date(startDate.getTime());
            while (current <= endDate) {
                const name = current.toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric"
                });

                if (!keyMap.has(name)) {
                    keyMap.set(name, salesData.length);
                    salesData.push({
                        month: name,
                        revenue: 0,
                        enrollments: 0
                    });
                }
                current.setDate(current.getDate() + 1);
}
        } else {
            let current = new Date(startDate.getFullYear(), startDate.getMonth(), 1);
            const targetEnd = new Date(endDate.getFullYear(), endDate.getMonth(), 1);
            while (current <= targetEnd) {
                const name = current.toLocaleDateString("en-US", { month: "short" });
                if (!keyMap.has(name)) {
                    keyMap.set(name, salesData.length);
                    salesData.push({ month: name, revenue: 0, enrollments: 0 });
                }
                current.setMonth(current.getMonth() + 1);
            }
        }

        // Aggregate period transactions
        const periodTxs = await manager.find(Transaction, {
            where: { status: "success" as any, createdAt: Between(startDate, endDate) }
        });
        for (const t of periodTxs) {
            const name = diffDays <= 31 
                ? t.createdAt.toLocaleDateString("en-US", { month: "short", day: "numeric" })
                : t.createdAt.toLocaleDateString("en-US", { month: "short" });
            const idx = keyMap.get(name);
            if (idx !== undefined) {
                salesData[idx].revenue += (t.amount || 0);
            }
        }

        // Aggregate period enrollments
        for (const e of enrollments) {
            const name = diffDays <= 31 
                ? e.createdAt.toLocaleDateString("en-US", { month: "short", day: "numeric" })
                : e.createdAt.toLocaleDateString("en-US", { month: "short" });
            const idx = keyMap.get(name);
            if (idx !== undefined) {
                salesData[idx].enrollments += 1;
            }
        }

        // 5. Quarterly Revenue and Enrollment Data
        const revenueQuarterMap = { Q1: 0, Q2: 0, Q3: 0, Q4: 0 };
        for (const t of periodTxs) {
            const qIndex = Math.floor(t.createdAt.getMonth() / 3) + 1;
            const key = `Q${qIndex}` as "Q1" | "Q2" | "Q3" | "Q4";
            revenueQuarterMap[key] += (t.amount || 0);
        }
        const quarterlyRevenue = Object.entries(revenueQuarterMap).map(([name, value]) => ({
            name,
            value
        }));

        const enrollmentQuarterMap = { Q1: 0, Q2: 0, Q3: 0, Q4: 0 };
        for (const e of enrollments) {
            const qIndex = Math.floor(e.createdAt.getMonth() / 3) + 1;
            const key = `Q${qIndex}` as "Q1" | "Q2" | "Q3" | "Q4";
            enrollmentQuarterMap[key] += 1;
        }
        const quarterlyEnrollments = Object.entries(enrollmentQuarterMap).map(([name, value]) => ({
            name,
            value
        }));

        // 6. Tuition Leaderboard (top 5 courses)
        const courses = await manager.find(Course, { relations: ["enrollments"] });
        const tuitionLeaderboard = courses.map((c:any) => {
            const enrolled = c.enrollments?.length || 0;
            const courseTxs = currentTxs.filter(t => t.course?.id === c.id);
            const revenue = courseTxs.reduce((sum, t) => sum + (t.amount || 0), 0);
            return {
                title: c.title.length > 25 ? c.title.substring(0, 22) + "..." : c.title,
                enrolled,
                revenue
            };
        }).sort((a:any, b:any) => b.revenue - a.revenue).slice(0, 5);

        ctx.status = 200;
        ctx.body = {
            totalRevenue,
            revenueChangeRate,
            revenueIsUp: revenueChangeRate === 0 ? null : revenueChangeRate > 0,

            totalEnrollments,
            enrollmentsChangeRate,
            enrollmentsIsUp: enrollmentsChangeRate === 0 ? null : enrollmentsChangeRate > 0,

            averageFacultyRating,
            facultyRatingChangeRate,
            facultyRatingIsUp: facultyRatingChangeRate === 0 ? null : facultyRatingChangeRate > 0,

            salesData,
            quarterlyRevenue,
            quarterlyEnrollments,
            enrollmentBarData: tuitionLeaderboard
        };
    } catch (err: any) {
        console.error(err);
        ctx.status = 500;
        ctx.body = { message: err?.message || "Internal server error" };
    }
});

adminRouter.get("/activity", adminGuard, async (ctx: Koa.Context) => {
    try {
        const nameMap = await getUserFullNamesMap();
        const logs: any[] = [];

        // 1. Fetch recent courses
        const courses = await manager.find(Course, { order: { createdAt: "DESC" }, take: 10 });
        for (const c of courses) {
            logs.push({
                id: `course-${c.id}`,
                actor: c.provider || "Admin User",
                action: "published catalog course module",
                target: c.title,
                time: c.createdAt.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" }),
                date: c.createdAt.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
                category: "Course",
                initials: (c.provider || "AU").substring(0, 2).toUpperCase(),
                color: "bg-indigo-100 text-indigo-700",
                rawDate: c.createdAt
            });
        }

        // 2. Fetch recent enrollments
        const enrollments = await manager.find(Enrollment, {
            relations: ["course", "user"],
            order: { createdAt: "DESC" },
            take: 10
        });
        for (const e of enrollments) {
            const studentName = nameMap.get(e.user.id) || e.user.identifier || "Student User";
            const parts = studentName.split(/\s+/);
            const initials = `${parts[0]?.[0] || ''}${parts[1]?.[0] || ''}`.toUpperCase() || 'SU';

            logs.push({
                id: `enroll-${e.id}`,
                actor: studentName,
                action: "enrolled in course syllabus",
                target: e.course?.title || "Sentinel Course",
                time: e.createdAt.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" }),
                date: e.createdAt.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
                category: "Course",
                initials,
                color: "bg-indigo-100 text-indigo-700",
                rawDate: e.createdAt
            });
        }

        // 3. Fetch recent instructors
        const instructors = await manager.find(Instructor, { order: { createdAt: "DESC" }, take: 10 });
        for (const ins of instructors) {
            const name = `${ins.firstName} ${ins.lastName}`;
            logs.push({
                id: `ins-${ins.id}`,
                actor: "System Administrator",
                action: "registered academic staff faculty",
                target: name,
                time: ins.createdAt.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" }),
                date: ins.createdAt.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
                category: "Faculty",
                initials: "SA",
                color: "bg-emerald-100 text-emerald-700",
                rawDate: ins.createdAt
            });
        }

        // 4. Fetch recent payments
        const transactions = await manager.find(Transaction, {
            relations: ["user"],
            where: { status: "success" as any },
            order: { createdAt: "DESC" },
            take: 10
        });
        for (const t of transactions) {
            if (!t.user) continue;
            const payerName = nameMap.get(t.user.id) || t.user.identifier || "Student User";
            const parts = payerName.split(/\s+/);
            const initials = `${parts[0]?.[0] || ''}${parts[1]?.[0] || ''}`.toUpperCase() || 'SU';

            logs.push({
                id: `tx-${t.id}`,
                actor: payerName,
                action: "processed payment transaction",
                target: `$${t.amount}`,
                time: t.createdAt.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" }),
                date: t.createdAt.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
                category: "System",
                initials,
                color: "bg-zinc-100 text-zinc-700",
                rawDate: t.createdAt
            });
        }

        // Sort all logs by date descending
        logs.sort((a, b) => new Date(b.rawDate).getTime() - new Date(a.rawDate).getTime());

        ctx.status = 200;
        ctx.body = logs.slice(0, 30);
    } catch (err: any) {
        console.error(err);
        ctx.status = 500;
        ctx.body = { message: err?.message || "Internal server error" };
    }
});

adminRouter.get("/search", adminGuard, async (ctx: Koa.Context) => {
    try {
        const q = (ctx.query.q as string || "").trim().toLowerCase();
        if (!q) {
            ctx.status = 200;
            ctx.body = { courses: [], instructors: [], activities: [] };
            return;
        }

        // 1. Search Courses
        const courses = await manager.find(Course, { relations: ["instructor"] });
        const matchedCourses = courses.filter(c => 
            c.title.toLowerCase().includes(q) || 
            (c.specialization && c.specialization.toLowerCase().includes(q))
        ).slice(0, 5).map(c => ({
            id: c.id,
            title: c.title,
            specialization: c.specialization,
            provider: c.provider
        }));

        // 2. Search Instructors
        const instructors = await manager.find(Instructor);
        const matchedInstructors = instructors.filter(i => 
            i.firstName.toLowerCase().includes(q) || 
            i.lastName.toLowerCase().includes(q) ||
            (i.specialization && i.specialization.toLowerCase().includes(q)) ||
            i.email.toLowerCase().includes(q)
        ).slice(0, 5).map(i => ({
            id: i.id,
            name: `${i.firstName} ${i.lastName}`,
            email: i.email,
            specialization: i.specialization
        }));

        // 3. Search Activities
        const modules = await manager.find(Module, { relations: ["course"] });
        const lessons = await manager.find(Lesson, { relations: ["module", "module.course"] });

        const matchedActivities: any[] = [];
        for (const m of modules) {
            if (m.title.toLowerCase().includes(q)) {
                matchedActivities.push({
                    id: `mod-${m.id}`,
                    title: m.title,
                    type: "Module",
                    course: m.course?.title,
                    courseId: m.course?.id
                });
            }
        }
        for (const l of lessons) {
            if (l.title.toLowerCase().includes(q) || (l.description && l.description.toLowerCase().includes(q))) {
                matchedActivities.push({
                    id: `les-${l.id}`,
                    title: l.title,
                    type: "Lesson",
                    course: l.module?.course?.title,
                    courseId: l.module?.course?.id
                });
            }
        }

        ctx.status = 200;
        ctx.body = {
            courses: matchedCourses,
            instructors: matchedInstructors,
            activities: matchedActivities.slice(0, 5)
        };
    } catch (err: any) {
        console.error(err);
        ctx.status = 500;
        ctx.body = { message: err?.message || "Internal server error" };
    }
});

adminRouter.post("/test", adminGuard, async (ctx: Koa.Context) => {
    try {
        const { id, title, timeLimit, allowedAttempts, moduleId, questions } = ctx.request.body as any;

        let test: Test | null = null;
        if (id) {
            test = await manager.findOne(Test, {
                where: { id },
                relations: ["questions"]
            });
        } else if (moduleId) {
            test = await manager.findOne(Test, {
                where: { moduleId },
                relations: ["questions"]
            });
        }

        if (!test) {
            test = new Test();
        }

        test.title = title || "Assessment";
        test.timeLimit = Number(timeLimit) || 15;
        test.allowedAttempts = Number(allowedAttempts) || 3;
        
        if (moduleId) {
            test.moduleId = moduleId;
        }

        if (test.id) {
            // Delete existing questions of this test to mimic orphanRemoval
            await manager.delete(Question, { testId: test.id });
        }

        // Clear existing questions and reconstruct them
        const newQuestions: Question[] = [];
        if (questions && Array.isArray(questions)) {
            for (const q of questions) {
                const question = new Question();
                if (q.id && !q.id.startsWith("temp-")) {
                    question.id = q.id;
                }
                question.text = q.text;
                question.options = (q.options || []).map((opt: any) => ({
                    id: opt.id || Math.random().toString(36).substr(2, 9),
                    text: opt.text,
                    points: Number(opt.points) || 0,
                    isCorrect: !!opt.isCorrect
                }));
                newQuestions.push(question);
            }
        }
        test.questions = newQuestions;

        const savedTest = await manager.save(Test, test);

        ctx.status = 200;
        ctx.body = { success: true, test: savedTest };
    } catch (err: any) {
        console.error(err);
        ctx.status = 500;
        ctx.body = { message: err?.message || "Internal server error" };
    }
});

adminRouter.get("/test/module/:moduleId", adminGuard, async (ctx: Koa.Context) => {
    try {
        const { moduleId } = ctx.params;
        const test = await manager.findOne(Test, {
            where: { moduleId },
            relations: ["questions"]
        });

        ctx.status = 200;
        ctx.body = test || null;
    } catch (err: any) {
        console.error(err);
        ctx.status = 500;
        ctx.body = { message: err?.message || "Internal server error" };
    }
});

adminRouter.delete("/test/:id", adminGuard, async (ctx: Koa.Context) => {
    try {
        const { id } = ctx.params;
        await manager.delete(Test, id);
        ctx.status = 200;
        ctx.body = { success: true, message: "Test deleted successfully" };
    } catch (err: any) {
        console.error(err);
        ctx.status = 500;
        ctx.body = { message: err?.message || "Internal server error" };
    }
});

adminRouter.get("/uploads/:filename", async (ctx) => {
    const filename = ctx.params.filename;
    const filepath = path.join(process.cwd(), "uploads", filename);
    if (fs.existsSync(filepath)) {
        ctx.type = path.extname(filename);
        ctx.body = fs.createReadStream(filepath);
    } else {
        ctx.status = 404;
        ctx.body = "File not found";
    }
});

export { adminRouter };
