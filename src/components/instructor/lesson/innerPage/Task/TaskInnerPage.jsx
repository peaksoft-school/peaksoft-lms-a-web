/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
import styled from '@emotion/styled'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getTask } from '../../../../../store/INSTRUCTOR/taskInnerPage-slice'
import {
   CODE,
   FILE,
   IMAGE,
   LINK,
   TEXT,
} from '../../../../../utils/constants/general'
import { BreadCrumbs } from '../../../../UI/breadCrumb/BreadCrumbs'
import { Code } from './taskCode/Code'
import { File } from './taskFile/File'
import { Image } from './taskImage/Image'
import { TaskLink } from './taskLink/TaskLink'
import { Text } from './taskText/Text'

const TaskInnerPage = () => {
   const dispatch = useDispatch()
   const { tasks } = useSelector((state) => state.taskInnerPage)
   const { course } = useSelector((state) => state.materials)
   const { taskId, id } = useParams()

   useEffect(() => {
      dispatch(getTask(taskId))
   }, [])
   const pathsArray = [
      {
         path: '/instructor/instructor_course',
         name: 'курсы',
      },
      {
         path: `/instructor/instructor_course/${id}/materials`,
         name: course?.courseName,
      },
      {
         path: '/instructors',
         name: 'Материалы',
      },
   ]
   return (
      <Container>
         <BreadCrumbs pathsArray={pathsArray} />
         <Wrapper>
            {tasks.map((task) => (
               <div key={task.id}>
                  <p key={task.id}>{task.taskName}</p>
                  {task.taskTypeResponses.map((el) => {
                     if (el.taskType === IMAGE) {
                        return <Image image={el} key={el.name} />
                     }
                     if (el.taskType === FILE) {
                        return <File file={el} key={el.name} />
                     }
                     if (el.taskType === CODE) {
                        return <Code code={el} key={el.name} />
                     }
                     if (el.taskType === LINK) {
                        return <TaskLink link={el} key={el.name} />
                     }
                     if (el.taskType === TEXT) {
                        return <Text text={el} key={el.name} />
                     }
                  })}
               </div>
            ))}
         </Wrapper>
      </Container>
   )
}
export default TaskInnerPage
const Container = styled.div`
   margin-top: 20px;
`
const Wrapper = styled.div`
   width: 100%;
   height: 100%;
   background: #ffffff;
   border-radius: 10px;
   padding: 25px;
   margin-top: 15px;
   div {
      display: grid;
      grid-row-gap: 25px;
   }
   p {
      font-family: 'Open Sans', sans-serif;
      font-style: normal;
      font-weight: 400;
      font-size: 25px;
      line-height: 27px;
      margin-top: 5px;
   }
`
