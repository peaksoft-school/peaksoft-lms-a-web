import React from 'react'
import { Dashboard } from '../Dashboard'
import { ReactComponent as GroupsIcon } from '../../assets/icons/group.svg'
import { ReactComponent as CoursesIcon } from '../../assets/icons/courses.svg'
import { ReactComponent as TeachersIcon } from '../../assets/icons/teacher.svg'
import { ReactComponent as StudentsIcon } from '../../assets/icons/students.svg'

export const AdminDashboard = () => {
   return (
      <div>
         <Dashboard data={data} />
      </div>
   )
}

const data = [
   {
      icon: <GroupsIcon />,
      title: 'Группы',
      pathName: 'groups',
   },
   {
      icon: <CoursesIcon />,
      title: 'Курсы',
      pathName: 'courses',
   },
   {
      icon: <TeachersIcon />,
      title: 'Учителя',
      pathName: 'teachers',
   },
   {
      icon: <StudentsIcon />,
      title: 'Студенты',
      pathName: 'students',
   },
]
