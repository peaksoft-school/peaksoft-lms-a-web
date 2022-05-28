import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Task } from '../components/insructor/task/Task'
import { LessonCard } from '../components/UI/lessonCard/LessonCard'
import { ROUTES } from '../utils/constants/general'

export const InstructorRoutes = () => {
   return (
      <div>
         <Routes>
            <Route
               path="/*"
               element={<Navigate to={ROUTES.INSTRUCTOR_COURSES} />}
            />
            <Route path={ROUTES.INSTRUCTOR_COURSES} element={<Task />} />
         </Routes>
      </div>
   )
}
