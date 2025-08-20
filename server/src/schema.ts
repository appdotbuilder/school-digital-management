import { z } from 'zod';

// Student schema
export const studentSchema = z.object({
  id: z.number(),
  student_id: z.string(), // Unique student identifier
  first_name: z.string(),
  last_name: z.string(),
  date_of_birth: z.coerce.date(),
  gender: z.enum(['male', 'female']),
  email: z.string().email().nullable(),
  phone: z.string().nullable(),
  address: z.string().nullable(),
  parent_name: z.string().nullable(),
  parent_phone: z.string().nullable(),
  parent_email: z.string().email().nullable(),
  enrollment_date: z.coerce.date(),
  class_id: z.number().nullable(),
  status: z.enum(['active', 'inactive', 'graduated', 'transferred']),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date()
});

export type Student = z.infer<typeof studentSchema>;

export const createStudentInputSchema = z.object({
  student_id: z.string(),
  first_name: z.string(),
  last_name: z.string(),
  date_of_birth: z.string(), // ISO date string input
  gender: z.enum(['male', 'female']),
  email: z.string().email().nullable(),
  phone: z.string().nullable(),
  address: z.string().nullable(),
  parent_name: z.string().nullable(),
  parent_phone: z.string().nullable(),
  parent_email: z.string().email().nullable(),
  enrollment_date: z.string(), // ISO date string input
  class_id: z.number().nullable(),
  status: z.enum(['active', 'inactive', 'graduated', 'transferred']).default('active')
});

export type CreateStudentInput = z.infer<typeof createStudentInputSchema>;

export const updateStudentInputSchema = z.object({
  id: z.number(),
  student_id: z.string().optional(),
  first_name: z.string().optional(),
  last_name: z.string().optional(),
  date_of_birth: z.string().optional(),
  gender: z.enum(['male', 'female']).optional(),
  email: z.string().email().nullable().optional(),
  phone: z.string().nullable().optional(),
  address: z.string().nullable().optional(),
  parent_name: z.string().nullable().optional(),
  parent_phone: z.string().nullable().optional(),
  parent_email: z.string().email().nullable().optional(),
  enrollment_date: z.string().optional(),
  class_id: z.number().nullable().optional(),
  status: z.enum(['active', 'inactive', 'graduated', 'transferred']).optional()
});

export type UpdateStudentInput = z.infer<typeof updateStudentInputSchema>;

// Teacher/Staff schema
export const teacherSchema = z.object({
  id: z.number(),
  employee_id: z.string(), // Unique employee identifier
  first_name: z.string(),
  last_name: z.string(),
  email: z.string().email(),
  phone: z.string().nullable(),
  address: z.string().nullable(),
  date_of_birth: z.coerce.date().nullable(),
  hire_date: z.coerce.date(),
  position: z.enum(['teacher', 'principal', 'vice_principal', 'staff', 'librarian', 'counselor']),
  department: z.string().nullable(),
  qualifications: z.string().nullable(),
  status: z.enum(['active', 'inactive', 'resigned', 'retired']),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date()
});

export type Teacher = z.infer<typeof teacherSchema>;

export const createTeacherInputSchema = z.object({
  employee_id: z.string(),
  first_name: z.string(),
  last_name: z.string(),
  email: z.string().email(),
  phone: z.string().nullable(),
  address: z.string().nullable(),
  date_of_birth: z.string().nullable(),
  hire_date: z.string(),
  position: z.enum(['teacher', 'principal', 'vice_principal', 'staff', 'librarian', 'counselor']),
  department: z.string().nullable(),
  qualifications: z.string().nullable(),
  status: z.enum(['active', 'inactive', 'resigned', 'retired']).default('active')
});

export type CreateTeacherInput = z.infer<typeof createTeacherInputSchema>;

export const updateTeacherInputSchema = z.object({
  id: z.number(),
  employee_id: z.string().optional(),
  first_name: z.string().optional(),
  last_name: z.string().optional(),
  email: z.string().email().optional(),
  phone: z.string().nullable().optional(),
  address: z.string().nullable().optional(),
  date_of_birth: z.string().nullable().optional(),
  hire_date: z.string().optional(),
  position: z.enum(['teacher', 'principal', 'vice_principal', 'staff', 'librarian', 'counselor']).optional(),
  department: z.string().nullable().optional(),
  qualifications: z.string().nullable().optional(),
  status: z.enum(['active', 'inactive', 'resigned', 'retired']).optional()
});

export type UpdateTeacherInput = z.infer<typeof updateTeacherInputSchema>;

// Class schema
export const classSchema = z.object({
  id: z.number(),
  name: z.string(), // e.g., "10A", "Grade 5B"
  grade_level: z.number().int(), // 1-12
  homeroom_teacher_id: z.number().nullable(),
  academic_year: z.string(), // e.g., "2024/2025"
  max_students: z.number().int(),
  status: z.enum(['active', 'inactive']),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date()
});

export type Class = z.infer<typeof classSchema>;

export const createClassInputSchema = z.object({
  name: z.string(),
  grade_level: z.number().int().min(1).max(12),
  homeroom_teacher_id: z.number().nullable(),
  academic_year: z.string(),
  max_students: z.number().int().positive(),
  status: z.enum(['active', 'inactive']).default('active')
});

export type CreateClassInput = z.infer<typeof createClassInputSchema>;

// Subject schema
export const subjectSchema = z.object({
  id: z.number(),
  code: z.string(), // Subject code e.g., "MATH101"
  name: z.string(),
  description: z.string().nullable(),
  grade_level: z.number().int(), // Which grade this subject is for
  credits: z.number().int(), // Credit hours
  status: z.enum(['active', 'inactive']),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date()
});

export type Subject = z.infer<typeof subjectSchema>;

export const createSubjectInputSchema = z.object({
  code: z.string(),
  name: z.string(),
  description: z.string().nullable(),
  grade_level: z.number().int().min(1).max(12),
  credits: z.number().int().positive(),
  status: z.enum(['active', 'inactive']).default('active')
});

export type CreateSubjectInput = z.infer<typeof createSubjectInputSchema>;

// Grade schema
export const gradeSchema = z.object({
  id: z.number(),
  student_id: z.number(),
  subject_id: z.number(),
  teacher_id: z.number(),
  class_id: z.number(),
  grade_type: z.enum(['quiz', 'assignment', 'midterm', 'final', 'project']),
  score: z.number().min(0).max(100),
  max_score: z.number().positive(),
  grade_date: z.coerce.date(),
  academic_year: z.string(),
  semester: z.enum(['1', '2']),
  notes: z.string().nullable(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date()
});

export type Grade = z.infer<typeof gradeSchema>;

export const createGradeInputSchema = z.object({
  student_id: z.number(),
  subject_id: z.number(),
  teacher_id: z.number(),
  class_id: z.number(),
  grade_type: z.enum(['quiz', 'assignment', 'midterm', 'final', 'project']),
  score: z.number().min(0).max(100),
  max_score: z.number().positive(),
  grade_date: z.string(),
  academic_year: z.string(),
  semester: z.enum(['1', '2']),
  notes: z.string().nullable()
});

export type CreateGradeInput = z.infer<typeof createGradeInputSchema>;

// Attendance schema
export const attendanceSchema = z.object({
  id: z.number(),
  student_id: z.number(),
  class_id: z.number(),
  subject_id: z.number().nullable(),
  teacher_id: z.number(),
  date: z.coerce.date(),
  status: z.enum(['present', 'absent', 'late', 'excused']),
  notes: z.string().nullable(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date()
});

export type Attendance = z.infer<typeof attendanceSchema>;

export const createAttendanceInputSchema = z.object({
  student_id: z.number(),
  class_id: z.number(),
  subject_id: z.number().nullable(),
  teacher_id: z.number(),
  date: z.string(),
  status: z.enum(['present', 'absent', 'late', 'excused']),
  notes: z.string().nullable()
});

export type CreateAttendanceInput = z.infer<typeof createAttendanceInputSchema>;

// Schedule schema
export const scheduleSchema = z.object({
  id: z.number(),
  class_id: z.number(),
  subject_id: z.number(),
  teacher_id: z.number(),
  day_of_week: z.enum(['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']),
  start_time: z.string(), // "08:00"
  end_time: z.string(), // "09:30"
  room: z.string().nullable(),
  academic_year: z.string(),
  semester: z.enum(['1', '2']),
  status: z.enum(['active', 'inactive', 'cancelled']),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date()
});

export type Schedule = z.infer<typeof scheduleSchema>;

export const createScheduleInputSchema = z.object({
  class_id: z.number(),
  subject_id: z.number(),
  teacher_id: z.number(),
  day_of_week: z.enum(['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']),
  start_time: z.string(),
  end_time: z.string(),
  room: z.string().nullable(),
  academic_year: z.string(),
  semester: z.enum(['1', '2']),
  status: z.enum(['active', 'inactive', 'cancelled']).default('active')
});

export type CreateScheduleInput = z.infer<typeof createScheduleInputSchema>;

// Announcement schema
export const announcementSchema = z.object({
  id: z.number(),
  title: z.string(),
  content: z.string(),
  author_id: z.number(), // Teacher/Staff ID who created the announcement
  target_audience: z.enum(['all', 'students', 'teachers', 'staff', 'parents']),
  priority: z.enum(['low', 'medium', 'high', 'urgent']),
  publish_date: z.coerce.date(),
  expiry_date: z.coerce.date().nullable(),
  status: z.enum(['draft', 'published', 'archived']),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date()
});

export type Announcement = z.infer<typeof announcementSchema>;

export const createAnnouncementInputSchema = z.object({
  title: z.string(),
  content: z.string(),
  author_id: z.number(),
  target_audience: z.enum(['all', 'students', 'teachers', 'staff', 'parents']),
  priority: z.enum(['low', 'medium', 'high', 'urgent']).default('medium'),
  publish_date: z.string(),
  expiry_date: z.string().nullable(),
  status: z.enum(['draft', 'published', 'archived']).default('draft')
});

export type CreateAnnouncementInput = z.infer<typeof createAnnouncementInputSchema>;

// Message schema
export const messageSchema = z.object({
  id: z.number(),
  sender_id: z.number(),
  sender_type: z.enum(['student', 'teacher']),
  recipient_id: z.number(),
  recipient_type: z.enum(['student', 'teacher']),
  subject: z.string(),
  content: z.string(),
  is_read: z.boolean(),
  parent_message_id: z.number().nullable(), // For message threads
  created_at: z.coerce.date(),
  updated_at: z.coerce.date()
});

export type Message = z.infer<typeof messageSchema>;

export const createMessageInputSchema = z.object({
  sender_id: z.number(),
  sender_type: z.enum(['student', 'teacher']),
  recipient_id: z.number(),
  recipient_type: z.enum(['student', 'teacher']),
  subject: z.string(),
  content: z.string(),
  parent_message_id: z.number().nullable()
});

export type CreateMessageInput = z.infer<typeof createMessageInputSchema>;

// Library Resource schema
export const libraryResourceSchema = z.object({
  id: z.number(),
  title: z.string(),
  type: z.enum(['book', 'ebook', 'article', 'video', 'audio', 'document', 'presentation']),
  author: z.string().nullable(),
  isbn: z.string().nullable(),
  publisher: z.string().nullable(),
  publication_year: z.number().int().nullable(),
  description: z.string().nullable(),
  file_url: z.string().nullable(), // For digital resources
  file_size: z.number().nullable(), // In bytes
  category: z.string().nullable(),
  grade_levels: z.string(), // JSON array of grade levels, e.g., "[1,2,3]"
  subject_ids: z.string().nullable(), // JSON array of subject IDs
  status: z.enum(['available', 'unavailable', 'maintenance']),
  access_level: z.enum(['public', 'students_only', 'teachers_only', 'restricted']),
  download_count: z.number().int(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date()
});

export type LibraryResource = z.infer<typeof libraryResourceSchema>;

export const createLibraryResourceInputSchema = z.object({
  title: z.string(),
  type: z.enum(['book', 'ebook', 'article', 'video', 'audio', 'document', 'presentation']),
  author: z.string().nullable(),
  isbn: z.string().nullable(),
  publisher: z.string().nullable(),
  publication_year: z.number().int().nullable(),
  description: z.string().nullable(),
  file_url: z.string().nullable(),
  file_size: z.number().nullable(),
  category: z.string().nullable(),
  grade_levels: z.string(), // JSON string array
  subject_ids: z.string().nullable(),
  status: z.enum(['available', 'unavailable', 'maintenance']).default('available'),
  access_level: z.enum(['public', 'students_only', 'teachers_only', 'restricted']).default('public')
});

export type CreateLibraryResourceInput = z.infer<typeof createLibraryResourceInputSchema>;

// Library Access Log schema
export const libraryAccessLogSchema = z.object({
  id: z.number(),
  resource_id: z.number(),
  user_id: z.number(),
  user_type: z.enum(['student', 'teacher']),
  access_type: z.enum(['view', 'download', 'bookmark']),
  access_date: z.coerce.date(),
  ip_address: z.string().nullable(),
  created_at: z.coerce.date()
});

export type LibraryAccessLog = z.infer<typeof libraryAccessLogSchema>;

export const createLibraryAccessLogInputSchema = z.object({
  resource_id: z.number(),
  user_id: z.number(),
  user_type: z.enum(['student', 'teacher']),
  access_type: z.enum(['view', 'download', 'bookmark']),
  access_date: z.string(),
  ip_address: z.string().nullable()
});

export type CreateLibraryAccessLogInput = z.infer<typeof createLibraryAccessLogInputSchema>;