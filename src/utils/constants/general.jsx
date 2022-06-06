import { ReactComponent as GroupsIcon } from '../../assets/icons/group.svg'
import { ReactComponent as CoursesIcon } from '../../assets/icons/courses.svg'
import { ReactComponent as TeachersIcon } from '../../assets/icons/teacher.svg'
import { ReactComponent as StudentsIcon } from '../../assets/icons/students.svg'

export const BASE_URL =
   'http://peaksoftlmsab4-env.eba-azvcpcga.eu-west-2.elasticbeanstalk.com'

export const ROUTES = {
   LOGIN: '/login',
   ADMIN: '/admin/*',
   GROUPS: 'groups',
   TEACHERS: 'teachers',
   COURSES: 'courses',
   STUDENTS: 'students',
   INSTRUCTOR: '/instructor/*',
   INSTRUCTOR_COURSES: 'instructor_course',
   STUDENT: '/student/*',
   STUDENT_COURSES: 'student_course',
}

export const ADMINTABS = [
   {
      icon: <GroupsIcon />,
      title: 'Группы',
      pathName: ROUTES.GROUPS,
   },
   {
      icon: <CoursesIcon />,
      title: 'Курсы',
      pathName: ROUTES.COURSES,
   },
   {
      icon: <TeachersIcon />,
      title: 'Учителя',
      pathName: ROUTES.TEACHERS,
   },
   {
      icon: <StudentsIcon />,
      title: 'Студенты',
      pathName: ROUTES.STUDENTS,
   },
]

export const INSTRUCTORTABS = [
   {
      icon: <CoursesIcon />,
      title: 'Мои Курсы',
      pathName: ROUTES.INSTRUCTOR_COURSES,
   },
]

export const STUDENTTABS = [
   {
      icon: <CoursesIcon />,
      title: 'Мои Курсы',
      pathName: ROUTES.STUDENT_COURSES,
   },
]

export const AUTH_KEY = '@peaksoft-lms-a-auth-info'

export const DELETE_COURSE = 'delete_course'
export const APPOINT_TEACHER = 'apppoint_teacher'
export const ADD_COURSE = 'add_course'
export const EDIT_COURSE = 'edit_course'
export const CREATE_STUDENT = 'create-student'
export const EDIT_STUDENT = 'edit-student'
export const UPLOAD_STUDENT = 'upload-student'
export const DELETE_STUDENT = 'delete-student-confirmation'
export const STUDY_FORMAT = 'study-format'
export const ADD_STUDENT = 'add_student'
export const ADD_GROUP = 'add_group'
export const ADD_COURSES = 'add_courses'
export const ADD_LESSON = 'create_lesson'
export const EDIT_LESSON = 'edit_lesson'
export const DELETE_LESSON = 'delete-lesson-confirmation'

export const STUDY_FORMAT_OPTION = [
   {
      id: 'ONLINE',
      title: 'ONLINE',
   },
   {
      id: 'OFFLINE',
      title: 'OFFLINE',
   },
]
export const ADD_TEACHERS = 'add_tachers'
export const DELETE_TEACHER = 'delete_teacher'
export const EDIT_TEACHER = 'edit_tacher'

export const COURSE_INNER_TABS = [
   {
      title: 'Учителя',
      to: 'course_instructors',
   },
   {
      title: 'Студенты',
      to: 'course_students',
   },
]

export const MATERIALS_INNER_TABS = [
   {
      title: 'Материалы',
      to: 'materials',
   },
   {
      title: 'Студенты',
      to: 'students',
   },
]

export const COURSE_INSTRUCTORS = [
   {
      id: 1,
      title: 'ID',
      accessKey: 'id',
   },
   {
      id: 2,
      title: 'Имя Фамилия',
      accessKey: 'fullName',
   },
   {
      id: 3,
      title: 'Специализация',
      accessKey: 'specialization',
   },
   {
      id: 4,
      title: 'Номер телефона',
      accessKey: 'phoneNumber',
   },
   {
      id: 5,
      title: 'E-mail',
      accessKey: 'email',
   },
]

export const COURSE_STUDENTS = [
   {
      title: 'ID',
      accessKey: 'id',
      id: 1,
   },
   {
      title: 'Имя Фамилия',
      accessKey: 'fullName',
      id: 2,
   },
   {
      title: 'Группа',
      accessKey: 'groupName',
      id: 3,
   },
   {
      title: 'Формат обучения',
      accessKey: 'studyFormat',
      id: 4,
   },
   {
      title: 'Номер телефона',
      accessKey: 'phoneNumber',
      id: 5,
   },
   {
      title: 'E-mail',
      accessKey: 'email',
      id: 6,
   },
]

export const TEST_INFO = [
   {
      title: 'Имя Фамилия',
      accessKey: 'studentName',
      id: 1,
   },
   {
      title: 'Дата',
      accessKey: 'date',
      id: 2,
   },
   {
      title: 'Статус',
      accessKey: 'status',
      id: 3,
   },
   {
      title: 'Оценка',
      accessKey: 'grade',
      id: 4,
   },
]
export const STUDENTS_INFO = [
   { title: 'N', accessKey: 'id', id: 'one' },
   { title: 'Имя Фамилия', accessKey: 'fullName', id: 'two' },
   { title: 'Группа', accessKey: 'groupName', id: 'three' },
   { title: 'Формат обучения', accessKey: 'studyFormat', id: 'four' },
   { title: 'Номер телефона', accessKey: 'phoneNumber', id: 'five' },
   { title: 'E-mail', accessKey: 'email', id: 'six' },
]
