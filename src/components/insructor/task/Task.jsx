import styled from '@emotion/styled'
import React, { useState } from 'react'
import { Tooltip } from '@mui/material'
import { useSelector } from 'react-redux'
import { Button } from '../../UI/button/Button'
import { Input } from '../../UI/input/Input'
import { ReactComponent as TextIcon } from '../../../assets/icons/text.svg'
import { ReactComponent as CodeIcon } from '../../../assets/icons/code.svg'
import { BreadCrumbs } from '../../UI/BreadCrumb/BreadCrumbs'
import { TextEditor } from './TextEditor/TextEditor'
import { SelectFile } from './taskFile/SelectFile'
import { SelectImage } from './taskImage/SelectImage'
import { Link as TaskLink } from './taskLink/Link'
import { Code } from './taskCode/Code'
import { Image } from './taskImage/Image'
import { File } from './taskFile/File'
import { AddLinkModal } from './taskLink/AddLink'

export const Task = () => {
   const [showTextEditor, setShowTextEditor] = useState(false)
   const [showFile, setShowFile] = useState(false)
   const [showLink, setShowLink] = useState(false)
   const [showImage, setShowImage] = useState(false)
   const [showCode, setShowCode] = useState(false)

   const showText = () => {
      setShowTextEditor(true)
   }
   const showFileHandler = () => {
      setShowFile(true)
   }
   const showLinkHandler = () => {
      setShowLink(true)
   }
   const showImageHandler = () => {
      setShowImage(true)
   }
   const showCodeHandler = () => {
      setShowCode(true)
   }

   return (
      <>
         <StyledBreadCrumbs>
            <BreadCrumbs pathsArray={pathsArray} />
         </StyledBreadCrumbs>
         <Container>
            <StyledTitle>Создать задание</StyledTitle>
            <Title>
               <StyledText placeholder="Название задания" />
               <StyledIcons>
                  <StyledTooltip title="Текстовое поле" placement="top">
                     <StyledIcon>
                        <TextIcon onClick={showText} />
                     </StyledIcon>
                  </StyledTooltip>
                  <SelectFile showFileHandler={showFileHandler} />
                  <SelectImage />
                  <AddLinkModal />
                  <StyledTooltip title="Код" placement="top">
                     <StyledIcon>
                        <CodeIcon onClick={showCodeHandler} />
                     </StyledIcon>
                  </StyledTooltip>
               </StyledIcons>
            </Title>
            <StyledContainer>
               {showTextEditor && <TextEditor />}
               <File />
               <Image />
               <TaskLink />
               {showCode && <Code />}
            </StyledContainer>
            <ButtonContainer>
               <StyledButton>
                  <Button
                     background="none"
                     border="1px solid #3772FF"
                     color="#3772FF"
                  >
                     Отмена
                  </Button>
                  <Button
                     background="#3772FF"
                     bgHover="#1D60FF"
                     bgActive="#6190FF"
                  >
                     Сохранить
                  </Button>
               </StyledButton>
            </ButtonContainer>
         </Container>
      </>
   )
}

const pathsArray = [
   {
      path: 'admin',
      name: 'курсы',
   },
   {
      path: 'courses',
      name: 'courseName',
   },
   {
      path: '/instructors',
      name: 'Студенты',
   },
]
const Container = styled.div`
   width: 100%;
   border-radius: 8px;
   padding: 20px 20px 0 20px;
   background-color: #fbfbfb;
`
const StyledTitle = styled.div`
   font-family: 'Open Sans', sans-serif;
   font-style: normal;
   font-weight: 500;
   font-size: 19px;
   line-height: 22px;
   color: #1f6ed4;
   width: 154px;
   height: 22px;
`
const Title = styled.div`
   height: 70px;
   display: flex;
   align-items: flex-end;
`
const StyledText = styled(Input)`
   width: 842px;
   height: 42px;
`
const StyledIcons = styled.div`
   margin-left: 30px;
   margin-bottom: 7px;
   width: 280px;
   display: flex;
   justify-content: space-between;
   align-items: center;
   cursor: pointer;
`
const StyledContainer = styled.div`
   margin-top: 20px;
   width: 100%;
   /* min-height: 822px; */
   background: #ffffff;
   border: 1px solid #d4d4d4;
   border-radius: 10px;
   padding: 18px;
`
const ButtonContainer = styled.div`
   height: 80px;
   display: flex;
   justify-content: flex-end;
   align-items: center;
`
const StyledButton = styled.div`
   width: 250px;
   display: flex;
   justify-content: space-between;
   height: 40px;
`
const StyledBreadCrumbs = styled.div`
   height: 65px;
   padding-bottom: 16px;
   display: flex;
   align-items: flex-end;
`

const StyledTooltip = styled(({ className, ...props }) => (
   <Tooltip {...props} classes={{ popper: className }} />
))`
   & .MuiTooltip-tooltip {
      background: #8d949e;
      border-radius: 8px;
      height: 28px;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      padding: 6px 8px;
      gap: 10px;
   }
`
const StyledIcon = styled.div`
   width: 34px;
   height: 28px;
   display: flex;
   align-items: center;
   justify-content: center;
   & input {
      display: none;
   }
   &:hover {
      background: #d4d4d4;
      border-radius: 6px;
   }
`
