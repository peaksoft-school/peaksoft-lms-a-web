/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
import styled from '@emotion/styled'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getTask } from '../../../../../store/taskInnerPage-slice'
import {
   CODE,
   FILE,
   IMAGE,
   LINK,
   TEXT,
} from '../../../../../utils/constants/general'
import { Code } from './taskCode/Code'
import { File } from './taskFile/File'
import { Image } from './taskImage/Image'
import { TaskLink } from './taskLink/TaskLink'
import { Text } from './taskText/Text'

export const TaskInnerPage = () => {
   const dispatch = useDispatch()
   const { tasks } = useSelector((state) => state.taskInnerPage)

   useEffect(() => {
      dispatch(getTask())
   }, [])
   console.log(tasks)

   return (
      <Wrapper>
         {tasks.map((task) => (
            <>
               <h2>{task.taskName}</h2>
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
            </>
         ))}
      </Wrapper>
   )
}

const Wrapper = styled.div`
   width: 100%;
   height: 100%;
   background: #ffffff;
   border-radius: 10px;
   padding: 25px;
   h2 {
      font-family: 'Open Sans';
      font-style: normal;
      font-weight: 400;
      font-size: 20px;
      line-height: 27px;
   }
`
