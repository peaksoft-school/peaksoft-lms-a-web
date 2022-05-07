import React from 'react'
import { Dashboard } from '../Dashboard'
import { ReactComponent as CoursesIcon } from '../../assets/icons/courses.svg'

export const InstructorDashboard = () => {
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
      pathName: 'mycourses',
   },
]
