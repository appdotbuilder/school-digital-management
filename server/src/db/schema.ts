import { 
  serial, 
  text, 
  pgTable, 
  timestamp, 
  integer, 
  varchar,
  date,
  time,
  boolean,
  pgEnum,
  decimal
} from 'drizzle-orm/pg-core';

// Define enums
export const genderEnum = pgEnum('gender', ['male', 'female']);
export const studentStatusEnum = pgEnum('student_status', ['active', 'inactive', 'graduated', 'transferred']);
export const teacherPositionEnum = pgEnum('teacher_position', ['teacher', 'principal', 'vice_principal', 'staff', 'librarian', 'counselor']);
export const teacherStatusEnum = pgEnum('teacher_status', ['active', 'inactive', 'resigned', 'retired']);
export const classStatusEnum = pgEnum('class_status', ['active', 'inactive']);
export const subjectStatusEnum = pgEnum('subject_status', ['active', 'inactive']);
export const gradeTypeEnum = pgEnum('grade_type', ['quiz', 'assignment', 'midterm', 'final', 'project']);
export const semesterEnum = pgEnum('semester', ['1', '2']);
export const attendanceStatusEnum = pgEnum('attendance_status', ['present', 'absent', 'late', 'excused']);
export const dayOfWeekEnum = pgEnum('day_of_week', ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']);
export const scheduleStatusEnum = pgEnum('schedule_status', ['active', 'inactive', 'cancelled']);
export const targetAudienceEnum = pgEnum('target_audience', ['all', 'students', 'teachers', 'staff', 'parents']);
export const priorityEnum = pgEnum('priority', ['low', 'medium', 'high', 'urgent']);
export const announcementStatusEnum = pgEnum('announcement_status', ['draft', 'published', 'archived']);
export const userTypeEnum = pgEnum('user_type', ['student', 'teacher']);
export const resourceTypeEnum = pgEnum('resource_type', ['book', 'ebook', 'article', 'video', 'audio', 'document', 'presentation']);
export const resourceStatusEnum = pgEnum('resource_status', ['available', 'unavailable', 'maintenance']);
export const accessLevelEnum = pgEnum('access_level', ['public', 'students_only', 'teachers_only', 'restricted']);
export const accessTypeEnum = pgEnum('access_type', ['view', 'download', 'bookmark']);

// Students table
export const studentsTable = pgTable('students', {
  id: serial('id').primaryKey(),
  student_id: varchar('student_id', { length: 50 }).notNull().unique(),
  first_name: varchar('first_name', { length: 100 }).notNull(),
  last_name: varchar('last_name', { length: 100 }).notNull(),
  date_of_birth: date('date_of_birth').notNull(),
  gender: genderEnum('gender').notNull(),
  email: varchar('email', { length: 255 }),
  phone: varchar('phone', { length: 20 }),
  address: text('address'),
  parent_name: varchar('parent_name', { length: 200 }),
  parent_phone: varchar('parent_phone', { length: 20 }),
  parent_email: varchar('parent_email', { length: 255 }),
  enrollment_date: date('enrollment_date').notNull(),
  class_id: integer('class_id'),
  status: studentStatusEnum('status').notNull().default('active'),
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().notNull()
});

// Teachers table
export const teachersTable = pgTable('teachers', {
  id: serial('id').primaryKey(),
  employee_id: varchar('employee_id', { length: 50 }).notNull().unique(),
  first_name: varchar('first_name', { length: 100 }).notNull(),
  last_name: varchar('last_name', { length: 100 }).notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  phone: varchar('phone', { length: 20 }),
  address: text('address'),
  date_of_birth: date('date_of_birth'),
  hire_date: date('hire_date').notNull(),
  position: teacherPositionEnum('position').notNull(),
  department: varchar('department', { length: 100 }),
  qualifications: text('qualifications'),
  status: teacherStatusEnum('status').notNull().default('active'),
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().notNull()
});

// Classes table
export const classesTable = pgTable('classes', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 50 }).notNull(),
  grade_level: integer('grade_level').notNull(),
  homeroom_teacher_id: integer('homeroom_teacher_id'),
  academic_year: varchar('academic_year', { length: 20 }).notNull(),
  max_students: integer('max_students').notNull(),
  status: classStatusEnum('status').notNull().default('active'),
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().notNull()
});

// Subjects table
export const subjectsTable = pgTable('subjects', {
  id: serial('id').primaryKey(),
  code: varchar('code', { length: 20 }).notNull().unique(),
  name: varchar('name', { length: 200 }).notNull(),
  description: text('description'),
  grade_level: integer('grade_level').notNull(),
  credits: integer('credits').notNull(),
  status: subjectStatusEnum('status').notNull().default('active'),
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().notNull()
});

// Grades table
export const gradesTable = pgTable('grades', {
  id: serial('id').primaryKey(),
  student_id: integer('student_id').notNull(),
  subject_id: integer('subject_id').notNull(),
  teacher_id: integer('teacher_id').notNull(),
  class_id: integer('class_id').notNull(),
  grade_type: gradeTypeEnum('grade_type').notNull(),
  score: decimal('score', { precision: 5, scale: 2 }).notNull(),
  max_score: decimal('max_score', { precision: 5, scale: 2 }).notNull(),
  grade_date: date('grade_date').notNull(),
  academic_year: varchar('academic_year', { length: 20 }).notNull(),
  semester: semesterEnum('semester').notNull(),
  notes: text('notes'),
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().notNull()
});

// Attendance table
export const attendanceTable = pgTable('attendance', {
  id: serial('id').primaryKey(),
  student_id: integer('student_id').notNull(),
  class_id: integer('class_id').notNull(),
  subject_id: integer('subject_id'),
  teacher_id: integer('teacher_id').notNull(),
  date: date('date').notNull(),
  status: attendanceStatusEnum('status').notNull(),
  notes: text('notes'),
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().notNull()
});

// Schedules table
export const schedulesTable = pgTable('schedules', {
  id: serial('id').primaryKey(),
  class_id: integer('class_id').notNull(),
  subject_id: integer('subject_id').notNull(),
  teacher_id: integer('teacher_id').notNull(),
  day_of_week: dayOfWeekEnum('day_of_week').notNull(),
  start_time: time('start_time').notNull(),
  end_time: time('end_time').notNull(),
  room: varchar('room', { length: 50 }),
  academic_year: varchar('academic_year', { length: 20 }).notNull(),
  semester: semesterEnum('semester').notNull(),
  status: scheduleStatusEnum('status').notNull().default('active'),
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().notNull()
});

// Announcements table
export const announcementsTable = pgTable('announcements', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 200 }).notNull(),
  content: text('content').notNull(),
  author_id: integer('author_id').notNull(),
  target_audience: targetAudienceEnum('target_audience').notNull(),
  priority: priorityEnum('priority').notNull().default('medium'),
  publish_date: timestamp('publish_date').notNull(),
  expiry_date: timestamp('expiry_date'),
  status: announcementStatusEnum('status').notNull().default('draft'),
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().notNull()
});

// Messages table
export const messagesTable = pgTable('messages', {
  id: serial('id').primaryKey(),
  sender_id: integer('sender_id').notNull(),
  sender_type: userTypeEnum('sender_type').notNull(),
  recipient_id: integer('recipient_id').notNull(),
  recipient_type: userTypeEnum('recipient_type').notNull(),
  subject: varchar('subject', { length: 200 }).notNull(),
  content: text('content').notNull(),
  is_read: boolean('is_read').notNull().default(false),
  parent_message_id: integer('parent_message_id'),
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().notNull()
});

// Library Resources table
export const libraryResourcesTable = pgTable('library_resources', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 300 }).notNull(),
  type: resourceTypeEnum('type').notNull(),
  author: varchar('author', { length: 200 }),
  isbn: varchar('isbn', { length: 20 }),
  publisher: varchar('publisher', { length: 200 }),
  publication_year: integer('publication_year'),
  description: text('description'),
  file_url: text('file_url'),
  file_size: integer('file_size'),
  category: varchar('category', { length: 100 }),
  grade_levels: text('grade_levels').notNull(), // JSON array
  subject_ids: text('subject_ids'), // JSON array
  status: resourceStatusEnum('status').notNull().default('available'),
  access_level: accessLevelEnum('access_level').notNull().default('public'),
  download_count: integer('download_count').notNull().default(0),
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().notNull()
});

// Library Access Logs table
export const libraryAccessLogsTable = pgTable('library_access_logs', {
  id: serial('id').primaryKey(),
  resource_id: integer('resource_id').notNull(),
  user_id: integer('user_id').notNull(),
  user_type: userTypeEnum('user_type').notNull(),
  access_type: accessTypeEnum('access_type').notNull(),
  access_date: timestamp('access_date').notNull(),
  ip_address: varchar('ip_address', { length: 45 }),
  created_at: timestamp('created_at').defaultNow().notNull()
});

// Export all tables for proper relation queries
export const tables = {
  students: studentsTable,
  teachers: teachersTable,
  classes: classesTable,
  subjects: subjectsTable,
  grades: gradesTable,
  attendance: attendanceTable,
  schedules: schedulesTable,
  announcements: announcementsTable,
  messages: messagesTable,
  libraryResources: libraryResourcesTable,
  libraryAccessLogs: libraryAccessLogsTable
};