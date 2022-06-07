import styled from '@emotion/styled'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getTask } from '../../../../../store/taskInnerPage-slice'

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
            <div key={task.id}>
               <Title>{task.taskName}</Title>
               {task.taskTypeResponses.map((el) => (
                  <div key={el.id}>
                     <a href={el.name}>Название файла, формат</a>
                     <Cart>
                        <img src={el.value} alt="taskType" />
                     </Cart>
                  </div>
               ))}
            </div>
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
`
const Title = styled.h1`
   color: #212121;
   font-style: normal;
   font-weight: 400;
   font-size: 20px;
   line-height: 27px;
   margin-bottom: 20px;
`
const Cart = styled.div`
   display: flex;
   flex-direction: column;
   width: 338px;
   height: 308px;
   background: #eff0f4;
   border-radius: 2px;
   img {
      width: 338px;
      height: 308px;
   }
`
