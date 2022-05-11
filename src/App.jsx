import React, { useState } from 'react'
import styled from '@emotion/styled'
import { GroupsPanel } from './components/admin/GroupsPanel'
import { ReactComponent as PinIcon } from './assets/icons/pinnedIcon.svg'
import { ReactComponent as EditIcon } from './assets/icons/edit.svg'
import { ReactComponent as DeleteIcon } from './assets/icons/trashIcon.svg'
import { ConfirmModal } from './components/UI/ConfirmModal'
import './App.css'

function App() {
   const options = [
      {
         id: 'one',
         action: () => alert('hello'),
         content: (
            <Container>
               <PinIcon />
               <p>Назначить учителя</p>
            </Container>
         ),
      },
      {
         id: 'onhhe',
         action: () => alert('hello'),
         content: (
            <Container>
               <EditIcon />
               <p>Редактировать</p>
            </Container>
         ),
      },
      {
         id: 'onhe',
         action: () => alert('hello'),
         content: (
            <Container>
               <DeleteIcon />
               <p>Удалить</p>
            </Container>
         ),
      },
   ]
   return (
      <div className="App">
         <GroupsPanel options={options} actions={options.actions} />
      </div>
   )
}

export default App

const Container = styled.div`
   width: 180px;
   display: flex;

   &:hover {
      color: blue;
   }
   p {
      margin-left: 20px;
   }
`
