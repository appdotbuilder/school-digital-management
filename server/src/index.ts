import { initTRPC } from '@trpc/server';
import { createHTTPServer } from '@trpc/server/adapters/standalone';
import 'dotenv/config';
import cors from 'cors';
import superjson from 'superjson';
import { z } from 'zod';

// Import schemas
import {
  createStudentInputSchema,
  updateStudentInputSchema,
  createTeacherInputSchema,
  updateTeacherInputSchema,
  createClassInputSchema,
  createSubjectInputSchema,
  createGradeInputSchema,
  createAttendanceInputSchema,
  createScheduleInputSchema,
  createAnnouncementInputSchema,
  createMessageInputSchema,
  createLibraryResourceInputSchema,
  createLibraryAccessLogInputSchema
} from './schema';

// Import handlers
import {
  createStudent,
  getStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
  getStudentsByClass
} from './handlers/student_handlers';

import {
  createTeacher,
  getTeachers,
  getTeacherById,
  updateTeacher,
  deleteTeacher,
  getTeachersByDepartment
} from './handlers/teacher_handlers';

import {
  createClass,
  getClasses,
  getClassById,
  getClassesByGradeLevel,
  getClassesByAcademicYear
} from './handlers/class_handlers';

import {
  createSubject,
  getSubjects,
  getSubjectById,
  getSubjectsByGradeLevel,
  updateSubject
} from './handlers/subject_handlers';

import {
  createGrade,
  getGradesByStudent,
  getGradesBySubject,
  getGradesByClass,
  getGradesByTeacher,
  updateGrade,
  deleteGrade
} from './handlers/grade_handlers';

import {
  createAttendance,
  getAttendanceByStudent,
  getAttendanceByClass,
  getAttendanceByDateRange,
  updateAttendance,
  getAttendanceStats
} from './handlers/attendance_handlers';

import {
  createSchedule,
  getSchedulesByClass,
  getSchedulesByTeacher,
  getSchedulesByDay,
  getFullSchedule,
  updateSchedule,
  deleteSchedule,
  checkScheduleConflict
} from './handlers/schedule_handlers';

import {
  createAnnouncement,
  getAnnouncements,
  getPublishedAnnouncements,
  getAnnouncementsByAudience,
  getAnnouncementsByAuthor,
  updateAnnouncement,
  publishAnnouncement,
  archiveAnnouncement
} from './handlers/announcement_handlers';

import {
  createMessage,
  getMessagesByUser,
  getReceivedMessages,
  getSentMessages,
  getMessageThread,
  markMessageAsRead,
  getUnreadMessageCount,
  deleteMessage
} from './handlers/message_handlers';

import {
  createLibraryResource,
  getLibraryResources,
  getLibraryResourcesByType,
  getLibraryResourcesByGradeLevel,
  getLibraryResourcesByCategory,
  searchLibraryResources,
  getLibraryResourceById,
  updateLibraryResource,
  deleteLibraryResource,
  incrementDownloadCount,
  logLibraryAccess,
  getLibraryAccessLogs,
  getPopularResources
} from './handlers/library_handlers';

const t = initTRPC.create({
  transformer: superjson,
});

const publicProcedure = t.procedure;
const router = t.router;

const appRouter = router({
  healthcheck: publicProcedure.query(() => {
    return { status: 'ok', timestamp: new Date().toISOString() };
  }),

  // Student Management Routes
  students: router({
    create: publicProcedure
      .input(createStudentInputSchema)
      .mutation(({ input }) => createStudent(input)),
    
    getAll: publicProcedure
      .query(() => getStudents()),
    
    getById: publicProcedure
      .input(z.object({ id: z.number() }))
      .query(({ input }) => getStudentById(input.id)),
    
    update: publicProcedure
      .input(updateStudentInputSchema)
      .mutation(({ input }) => updateStudent(input)),
    
    delete: publicProcedure
      .input(z.object({ id: z.number() }))
      .mutation(({ input }) => deleteStudent(input.id)),
    
    getByClass: publicProcedure
      .input(z.object({ classId: z.number() }))
      .query(({ input }) => getStudentsByClass(input.classId))
  }),

  // Teacher Management Routes
  teachers: router({
    create: publicProcedure
      .input(createTeacherInputSchema)
      .mutation(({ input }) => createTeacher(input)),
    
    getAll: publicProcedure
      .query(() => getTeachers()),
    
    getById: publicProcedure
      .input(z.object({ id: z.number() }))
      .query(({ input }) => getTeacherById(input.id)),
    
    update: publicProcedure
      .input(updateTeacherInputSchema)
      .mutation(({ input }) => updateTeacher(input)),
    
    delete: publicProcedure
      .input(z.object({ id: z.number() }))
      .mutation(({ input }) => deleteTeacher(input.id)),
    
    getByDepartment: publicProcedure
      .input(z.object({ department: z.string() }))
      .query(({ input }) => getTeachersByDepartment(input.department))
  }),

  // Class Management Routes
  classes: router({
    create: publicProcedure
      .input(createClassInputSchema)
      .mutation(({ input }) => createClass(input)),
    
    getAll: publicProcedure
      .query(() => getClasses()),
    
    getById: publicProcedure
      .input(z.object({ id: z.number() }))
      .query(({ input }) => getClassById(input.id)),
    
    getByGradeLevel: publicProcedure
      .input(z.object({ gradeLevel: z.number() }))
      .query(({ input }) => getClassesByGradeLevel(input.gradeLevel)),
    
    getByAcademicYear: publicProcedure
      .input(z.object({ academicYear: z.string() }))
      .query(({ input }) => getClassesByAcademicYear(input.academicYear))
  }),

  // Subject Management Routes
  subjects: router({
    create: publicProcedure
      .input(createSubjectInputSchema)
      .mutation(({ input }) => createSubject(input)),
    
    getAll: publicProcedure
      .query(() => getSubjects()),
    
    getById: publicProcedure
      .input(z.object({ id: z.number() }))
      .query(({ input }) => getSubjectById(input.id)),
    
    getByGradeLevel: publicProcedure
      .input(z.object({ gradeLevel: z.number() }))
      .query(({ input }) => getSubjectsByGradeLevel(input.gradeLevel)),
    
    update: publicProcedure
      .input(z.object({ 
        id: z.number(),
        updates: createSubjectInputSchema.partial()
      }))
      .mutation(({ input }) => updateSubject(input.id, input.updates))
  }),

  // Grade Management Routes
  grades: router({
    create: publicProcedure
      .input(createGradeInputSchema)
      .mutation(({ input }) => createGrade(input)),
    
    getByStudent: publicProcedure
      .input(z.object({ studentId: z.number() }))
      .query(({ input }) => getGradesByStudent(input.studentId)),
    
    getBySubject: publicProcedure
      .input(z.object({ subjectId: z.number() }))
      .query(({ input }) => getGradesBySubject(input.subjectId)),
    
    getByClass: publicProcedure
      .input(z.object({ classId: z.number() }))
      .query(({ input }) => getGradesByClass(input.classId)),
    
    getByTeacher: publicProcedure
      .input(z.object({ teacherId: z.number() }))
      .query(({ input }) => getGradesByTeacher(input.teacherId)),
    
    update: publicProcedure
      .input(z.object({ 
        gradeId: z.number(),
        updates: createGradeInputSchema.partial()
      }))
      .mutation(({ input }) => updateGrade(input.gradeId, input.updates)),
    
    delete: publicProcedure
      .input(z.object({ gradeId: z.number() }))
      .mutation(({ input }) => deleteGrade(input.gradeId))
  }),

  // Attendance Management Routes
  attendance: router({
    create: publicProcedure
      .input(createAttendanceInputSchema)
      .mutation(({ input }) => createAttendance(input)),
    
    getByStudent: publicProcedure
      .input(z.object({ studentId: z.number() }))
      .query(({ input }) => getAttendanceByStudent(input.studentId)),
    
    getByClass: publicProcedure
      .input(z.object({ classId: z.number(), date: z.string() }))
      .query(({ input }) => getAttendanceByClass(input.classId, input.date)),
    
    getByDateRange: publicProcedure
      .input(z.object({ startDate: z.string(), endDate: z.string() }))
      .query(({ input }) => getAttendanceByDateRange(input.startDate, input.endDate)),
    
    update: publicProcedure
      .input(z.object({ 
        attendanceId: z.number(),
        status: z.enum(['present', 'absent', 'late', 'excused']),
        notes: z.string().optional()
      }))
      .mutation(({ input }) => updateAttendance(input.attendanceId, input.status, input.notes)),
    
    getStats: publicProcedure
      .input(z.object({ studentId: z.number(), academicYear: z.string() }))
      .query(({ input }) => getAttendanceStats(input.studentId, input.academicYear))
  }),

  // Schedule Management Routes
  schedules: router({
    create: publicProcedure
      .input(createScheduleInputSchema)
      .mutation(({ input }) => createSchedule(input)),
    
    getByClass: publicProcedure
      .input(z.object({ classId: z.number() }))
      .query(({ input }) => getSchedulesByClass(input.classId)),
    
    getByTeacher: publicProcedure
      .input(z.object({ teacherId: z.number() }))
      .query(({ input }) => getSchedulesByTeacher(input.teacherId)),
    
    getByDay: publicProcedure
      .input(z.object({ dayOfWeek: z.string() }))
      .query(({ input }) => getSchedulesByDay(input.dayOfWeek)),
    
    getFull: publicProcedure
      .input(z.object({ academicYear: z.string(), semester: z.enum(['1', '2']) }))
      .query(({ input }) => getFullSchedule(input.academicYear, input.semester)),
    
    update: publicProcedure
      .input(z.object({ 
        scheduleId: z.number(),
        updates: createScheduleInputSchema.partial()
      }))
      .mutation(({ input }) => updateSchedule(input.scheduleId, input.updates)),
    
    delete: publicProcedure
      .input(z.object({ scheduleId: z.number() }))
      .mutation(({ input }) => deleteSchedule(input.scheduleId)),
    
    checkConflict: publicProcedure
      .input(z.object({ 
        teacherId: z.number(),
        dayOfWeek: z.string(),
        startTime: z.string(),
        endTime: z.string()
      }))
      .query(({ input }) => checkScheduleConflict(input.teacherId, input.dayOfWeek, input.startTime, input.endTime))
  }),

  // Announcement Management Routes
  announcements: router({
    create: publicProcedure
      .input(createAnnouncementInputSchema)
      .mutation(({ input }) => createAnnouncement(input)),
    
    getAll: publicProcedure
      .query(() => getAnnouncements()),
    
    getPublished: publicProcedure
      .query(() => getPublishedAnnouncements()),
    
    getByAudience: publicProcedure
      .input(z.object({ audience: z.enum(['all', 'students', 'teachers', 'staff', 'parents']) }))
      .query(({ input }) => getAnnouncementsByAudience(input.audience)),
    
    getByAuthor: publicProcedure
      .input(z.object({ authorId: z.number() }))
      .query(({ input }) => getAnnouncementsByAuthor(input.authorId)),
    
    update: publicProcedure
      .input(z.object({ 
        announcementId: z.number(),
        updates: createAnnouncementInputSchema.partial()
      }))
      .mutation(({ input }) => updateAnnouncement(input.announcementId, input.updates)),
    
    publish: publicProcedure
      .input(z.object({ announcementId: z.number() }))
      .mutation(({ input }) => publishAnnouncement(input.announcementId)),
    
    archive: publicProcedure
      .input(z.object({ announcementId: z.number() }))
      .mutation(({ input }) => archiveAnnouncement(input.announcementId))
  }),

  // Message Management Routes
  messages: router({
    create: publicProcedure
      .input(createMessageInputSchema)
      .mutation(({ input }) => createMessage(input)),
    
    getByUser: publicProcedure
      .input(z.object({ userId: z.number(), userType: z.enum(['student', 'teacher']) }))
      .query(({ input }) => getMessagesByUser(input.userId, input.userType)),
    
    getReceived: publicProcedure
      .input(z.object({ userId: z.number(), userType: z.enum(['student', 'teacher']) }))
      .query(({ input }) => getReceivedMessages(input.userId, input.userType)),
    
    getSent: publicProcedure
      .input(z.object({ userId: z.number(), userType: z.enum(['student', 'teacher']) }))
      .query(({ input }) => getSentMessages(input.userId, input.userType)),
    
    getThread: publicProcedure
      .input(z.object({ parentMessageId: z.number() }))
      .query(({ input }) => getMessageThread(input.parentMessageId)),
    
    markAsRead: publicProcedure
      .input(z.object({ messageId: z.number() }))
      .mutation(({ input }) => markMessageAsRead(input.messageId)),
    
    getUnreadCount: publicProcedure
      .input(z.object({ userId: z.number(), userType: z.enum(['student', 'teacher']) }))
      .query(({ input }) => getUnreadMessageCount(input.userId, input.userType)),
    
    delete: publicProcedure
      .input(z.object({ messageId: z.number() }))
      .mutation(({ input }) => deleteMessage(input.messageId))
  }),

  // Library Management Routes
  library: router({
    resources: router({
      create: publicProcedure
        .input(createLibraryResourceInputSchema)
        .mutation(({ input }) => createLibraryResource(input)),
      
      getAll: publicProcedure
        .query(() => getLibraryResources()),
      
      getById: publicProcedure
        .input(z.object({ id: z.number() }))
        .query(({ input }) => getLibraryResourceById(input.id)),
      
      getByType: publicProcedure
        .input(z.object({ type: z.string() }))
        .query(({ input }) => getLibraryResourcesByType(input.type)),
      
      getByGradeLevel: publicProcedure
        .input(z.object({ gradeLevel: z.number() }))
        .query(({ input }) => getLibraryResourcesByGradeLevel(input.gradeLevel)),
      
      getByCategory: publicProcedure
        .input(z.object({ category: z.string() }))
        .query(({ input }) => getLibraryResourcesByCategory(input.category)),
      
      search: publicProcedure
        .input(z.object({ query: z.string() }))
        .query(({ input }) => searchLibraryResources(input.query)),
      
      update: publicProcedure
        .input(z.object({ 
          id: z.number(),
          updates: createLibraryResourceInputSchema.partial()
        }))
        .mutation(({ input }) => updateLibraryResource(input.id, input.updates)),
      
      delete: publicProcedure
        .input(z.object({ id: z.number() }))
        .mutation(({ input }) => deleteLibraryResource(input.id)),
      
      incrementDownload: publicProcedure
        .input(z.object({ resourceId: z.number() }))
        .mutation(({ input }) => incrementDownloadCount(input.resourceId)),
      
      getPopular: publicProcedure
        .input(z.object({ limit: z.number().optional() }))
        .query(({ input }) => getPopularResources(input.limit))
    }),

    access: router({
      log: publicProcedure
        .input(createLibraryAccessLogInputSchema)
        .mutation(({ input }) => logLibraryAccess(input)),
      
      getLogs: publicProcedure
        .input(z.object({ 
          resourceId: z.number().optional(),
          userId: z.number().optional()
        }))
        .query(({ input }) => getLibraryAccessLogs(input.resourceId, input.userId))
    })
  })
});

export type AppRouter = typeof appRouter;

async function start() {
  const port = process.env['SERVER_PORT'] || 2022;
  const server = createHTTPServer({
    middleware: (req, res, next) => {
      cors()(req, res, next);
    },
    router: appRouter,
    createContext() {
      return {};
    },
  });
  server.listen(port);
  console.log(`TRPC School Management Server listening at port: ${port}`);
  console.log('Available routes:');
  console.log('- Student Management: /trpc/students.*');
  console.log('- Teacher Management: /trpc/teachers.*');
  console.log('- Class Management: /trpc/classes.*');
  console.log('- Subject Management: /trpc/subjects.*');
  console.log('- Grade Management: /trpc/grades.*');
  console.log('- Attendance Management: /trpc/attendance.*');
  console.log('- Schedule Management: /trpc/schedules.*');
  console.log('- Announcement Management: /trpc/announcements.*');
  console.log('- Message Management: /trpc/messages.*');
  console.log('- Library Management: /trpc/library.*');
}

start();