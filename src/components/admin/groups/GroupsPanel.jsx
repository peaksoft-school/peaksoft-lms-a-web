import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from '@emotion/styled'
import { Card } from '../../UI/card/Card'
import {
   showErrorMessage,
   showSuccessMessage,
} from '../../UI/notification/Notification'
import {
   deleteGroup,
   getSingleGroup,
   groupsPagination,
} from '../../../store/groupSlice'
import { ReactComponent as EditIcon } from '../../../assets/icons/edit.svg'
import { ReactComponent as DeleteIcon } from '../../../assets/icons/trashIcon.svg'
import GroupCreate from './GroupCreate'
import GroupDeleteConfirm from './GroupDeleteConfirm'

import GroupEdit from './GroupEdit'
import { Pagination } from '../../UI/pagination/Pagination'
import { Spinner } from '../../UI/Spinner/Spinner'

export const GroupsPanel = () => {
   const options = useMemo(() => [
      {
         id: 'wqqdfcfw',
         action: (id) => getSingleGroupId(id),
         content: (
            <Container>
               <EditIcon />
               <p>Редактировать</p>
            </Container>
         ),
      },
      {
         id: 'wqqdfvfvw',
         action: (id) => getGroupId(id),
         content: (
            <Container>
               <DeleteIcon />
               <p>Удалить</p>
            </Container>
         ),
      },
   ])
   const groups = useSelector((state) => state.groups.newGroupData)

   const { singleGroup, allPages, isLoading } = useSelector(
      (state) => state.groups
   )
   const dispatch = useDispatch()

   const [isModalOpen, setIsModalOpen] = useState(false)
   const [groupId, setGroupId] = useState()
   const [openEditGroupModal, setOpenEditGroupModal] = useState(false)
   const [page, setPage] = useState(1)

   useEffect(() => {
      dispatch(groupsPagination(page))
   }, [])

   const getGroupId = (id) => {
      setIsModalOpen(true)
      setGroupId(id)
   }

   const deletingModalHandler = () => {
      dispatch(deleteGroup({ id: groupId, page }))
         .unwrap()
         .then(() => {
            showSuccessMessage('Группа успешно удалена')
            setIsModalOpen(false)
         })
         .catch(() => {
            showErrorMessage('Не удалось удалить группу')
         })
   }

   const getSingleGroupId = (id) => {
      dispatch(getSingleGroup(id))
      setOpenEditGroupModal(true)
   }

   const groupsPaginationHandler = (page) => {
      setPage(page)
      dispatch(groupsPagination(page))
   }

   return (
      <>
         <GroupCreate page={page} />
         <StyledContainer>
            <CardContentStyleControl>
               {(isLoading && <Spinner />) ||
                  groups.map((group) => {
                     return (
                        <Card
                           image={group.image}
                           options={options}
                           title={group.groupName}
                           description={group.description}
                           date={group.dateOfStart}
                           key={group.id}
                           id={group.id}
                           path={`${group.id}/group_students`}
                        />
                     )
                  })}
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
                     page={page}
                  />
               )}
            </CardContentStyleControl>
            {allPages && (
               <PaginationStyleControl>
                  <Pagination
                     count={allPages}
                     page={page}
                     onChange={(_, num) => groupsPaginationHandler(num)}
                  />
               </PaginationStyleControl>
            )}
         </StyledContainer>
      </>
   )
}

const CardContentStyleControl = styled.div`
   margin-top: 30px;
   display: grid;
   grid-template-columns: repeat(4, 1fr);
   grid-column-gap: 20px;
   grid-row-gap: 20px;
   margin-bottom: 10px;
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
const PaginationStyleControl = styled.div`
   margin-top: 20px;
`
const StyledContainer = styled.div`
   margin-top: 20px;
   height: 880px;
   position: relative;
`
