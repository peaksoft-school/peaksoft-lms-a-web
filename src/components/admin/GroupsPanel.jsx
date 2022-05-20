import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from '@emotion/styled'
import { Card } from '../UI/card/Card'
import { Notification } from '../UI/notification/Notification'
import {
   deleteGroup,
   fetchNewGroups,
   getSingleGroup,
} from '../../store/groupSlice'
import { ReactComponent as PinIcon } from '../../assets/icons/pinnedIcon.svg'
import { ReactComponent as EditIcon } from '../../assets/icons/edit.svg'
import { ReactComponent as DeleteIcon } from '../../assets/icons/trashIcon.svg'
import GroupCreate from './GroupCreate'
import GroupDeleteConfirm from './GroupDeleteConfirm'

import GroupEdit from './GroupEdit'
import GroupSelectTeacher from './GroupSelectTeacher'

export const GroupsPanel = () => {
   const options = [
      {
         id: 'wqqw',
         action: () => alert('hello'),
         content: (
            <Container>
               <PinIcon />
               <p>Назначить учителя</p>
            </Container>
         ),
      },
      {
         id: 'wqqdfcfw',
         action: (group) => editGroupHandler(group.id),
         content: (
            <Container>
               <EditIcon />
               <p>Редактировать</p>
            </Container>
         ),
      },
      {
         id: 'wqqdfvfvw',
         action: (group) => getGroupId(group.id),
         content: (
            <Container>
               <DeleteIcon />
               <p>Удалить</p>
            </Container>
         ),
      },
   ]
   const groups = useSelector((state) => state.group.newGroupData)

   const { singleGroup } = useSelector((state) => state.group)

   const dispatch = useDispatch()

   const [isModalOpen, setIsModalOpen] = useState(false)
   const [groupId, setGroupId] = useState(null)
   const [isLoading, setIsLoading] = useState(false)
   const [openEditGroupModal, setOpenEditGroupModal] = useState(false)

   useEffect(() => {
      dispatch(fetchNewGroups())
   }, [])

   const getGroupId = (id) => {
      setIsModalOpen(true)
      setGroupId(id)
   }

   const deletingModalHandler = () => {
      dispatch(deleteGroup(groupId))
      setIsModalOpen(false)
   }

   const editGroupHandler = (id) => {
      dispatch(getSingleGroup(id))
      setOpenEditGroupModal(true)
   }

   return (
      <div>
         <GroupCreate setIsLoading={setIsLoading} />
         <CardContentStyleControl>
            {groups.map((group) => {
               return (
                  <Card
                     image={group.image}
                     options={options}
                     title={group.groupName}
                     description={group.description}
                     date={group.dateOfStart}
                     key={group.id}
                     cards={group}
                  />
               )
            })}
            {isLoading && <Notification message="Группа успешно создана" />}
            <GroupDeleteConfirm
               isModalOpen={isModalOpen}
               deletingModalHandler={deletingModalHandler}
               setIsModalOpen={setIsModalOpen}
            />
            {singleGroup && (
               <GroupEdit
                  singleGroup={singleGroup}
                  openEditGroupModal={openEditGroupModal}
                  setOpenEditGroupModal={setOpenEditGroupModal}
               />
            )}
            <GroupSelectTeacher />
         </CardContentStyleControl>
      </div>
   )
}

const CardContentStyleControl = styled.div`
   width: 270px;
   display: grid;
   grid-template-columns: repeat(4, 1fr);
   grid-column-gap: 20px;
   grid-row-gap: 20px;
`
const Container = styled.div`
   width: 180px;
   display: flex;
   align-items: center;

   &:hover {
      color: blue;
   }
   p {
      margin-left: 20px;
   }
`
