import React from 'react'
import { Dashboard } from '../Dashboard'
import { ReactComponent as CoursesIcon } from '../../assets/icons/courses.svg'
import { ROUTES } from '../../utils/constants/general'

export const StudentDashboard = () => {
   return (
      <div>
         <Dashboard data={data} />
      </div>
   )
}

const data = [
   {
      icon: <CoursesIcon />,
      title: 'Мои Курсы',
      pathName: ROUTES.STUDENT_COURSES,
   },
]
