import React from 'react'
import styled from '@emotion/styled'
import { SelectFile } from './taskFile/SelectFile'
import { SelectImage } from './taskImage/SelectImage'
import { AddLinkModal } from './taskLink/AddLink'
import { AddTaskCode } from './taskCode/AddTaskCode'
import { Text } from './TextEditor/Text'

export const TaskCreatorOptions = () => {
   return (
      <Container>
         <Text />
         <SelectFile />
         <SelectImage />
         <AddLinkModal />
         <AddTaskCode />
      </Container>
   )
}

const Container = styled.div`
   margin-left: 30px;
   margin-bottom: 7px;
   width: 280px;
   display: flex;
   justify-content: space-between;
   align-items: center;
   cursor: pointer;
`
