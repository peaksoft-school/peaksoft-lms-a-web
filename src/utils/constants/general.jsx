import { ReactComponent as GroupsIcon } from '../../assets/icons/group.svg'
import { ReactComponent as CoursesIcon } from '../../assets/icons/courses.svg'
import { ReactComponent as TeachersIcon } from '../../assets/icons/teacher.svg'
import { ReactComponent as StudentsIcon } from '../../assets/icons/students.svg'

export const ROUTES = {
   ADMIN: '/admin',
   GROUPS: '/admin/groups',
   TEACHERS: '/admin/teachers',
   COURSES: '/admin/courses',
   STUDENTS: '/admin/students',
   INSTRUCTOR: '/instructor',
   INSTRUCTOR_COURSES: '/instructor/instructor_course',
   STUDENT: '/student',
   STUDENT_COURSES: '/student/student_course',
}

export const ADMINDATA = [
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
