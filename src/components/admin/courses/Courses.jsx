import styled from '@emotion/styled'
import React, { useCallback, useState } from 'react'
import { CourseCards } from './CourseCards'
import { AddNewCourse } from './AddNewCourse'

export const Courses = () => {
   return (
      <div>
         <AddNewCourse />
         <CourseCards />
      </div>
   )
}
