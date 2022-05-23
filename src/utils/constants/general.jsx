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

export const CREATE_STUDENT = 'create-student'
export const EDIT_STUDENT = 'edit-student'
export const UPLOAD_STUDENT = 'upload-student'
export const DELETE_STUDENT = 'delete-student-confirmation'
export const STUDY_FORMAT = 'study-format'

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
