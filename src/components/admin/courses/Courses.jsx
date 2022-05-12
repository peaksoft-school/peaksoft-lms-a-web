import styled from '@emotion/styled'
import React, { useCallback, useState } from 'react'
import { CourseCards } from './CourseCards'
import { CoursesHeader } from './CoursesHeader'

export const Courses = () => {
   return (
      <div>
         <CoursesHeader />
         <CourseCards />
      </div>
   )
}
