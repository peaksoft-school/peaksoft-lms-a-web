/* eslint-disable no-nested-ternary */
import styled from '@emotion/styled'
import { Tooltip } from '@mui/material'
import React from 'react'
import { ReactEditor, useSlate } from 'slate-react'
import { Editor, Transforms, Element as SlateElement } from 'slate'
import { ReactComponent as TextIcon } from '../../../../assets/icons/simpleText.svg'
import { ReactComponent as ItalicIcon } from '../../../../assets/icons/italic.svg'
import { ReactComponent as UnderlineIcon } from '../../../../assets/icons/underline.svg'
import { ReactComponent as BoldIcon } from '../../../../assets/icons/bold.svg'
import { ReactComponent as UlIcon } from '../../../../assets/icons/ulList.svg'
import { ReactComponent as OlIcon } from '../../../../assets/icons/olList.svg'

export const Toolbar = () => {
   const editor = useSlate()

   const MarkButton = ({ format, title, icon }) => {
      return (
         <StyledTooltip title={title} placement="top">
            <StyledIcon
               active={isMarkActive(editor, format)}
               format={format}
               onMouseDown={(e) => {
                  e.preventDefault()
                  toggleMark(editor, format)
               }}
            >
               {icon}
            </StyledIcon>
         </StyledTooltip>
      )
   }
   const BlockButton = ({ format, title, icon }) => {
      return (
         <StyledTooltip title={title} placement="top">
            <StyledIcon
               active={isMarkActive(editor, format)}
               format={format}
               onMouseDown={(e) => {
                  e.preventDefault()
                  toggleBlock(editor, format)
               }}
            >
               {icon}
            </StyledIcon>
         </StyledTooltip>
      )
   }
   return (
      <Container>
         {toolbar.map((el) => {
            switch (el.type) {
               case 'mark':
                  return <MarkButton key={el.id} {...el} />
               case 'block':
                  return <BlockButton key={el.id} {...el} />
               default:
                  return <DefaultElement {...el} />
            }
         })}
      </Container>
   )
}

const DefaultElement = (props) => {
   return <p {...props.attributes}>{props.children}</p>
}
export const isMarkActive = (editor, format) => {
   const marks = Editor.marks(editor)

   return marks ? marks[format] === true : false
}
export const toggleMark = (editor, format) => {
   const isActive = isMarkActive(editor, format)

   if (isActive) {
      Editor.removeMark(editor, format)
   } else {
      Editor.addMark(editor, format, true)
   }
   ReactEditor.focus(editor)
}
const listTypes = ['orderedList', 'unorderedList']

export const toggleBlock = (editor, format) => {
   const isActive = isBlockActive(editor, format)
   const isList = listTypes.includes(format)

   Transforms.unwrapNodes(editor, {
      match: (n) =>
         listTypes.includes(
            !Editor.isEditor(n) && SlateElement.isElement(n) && n.type
         ),
      split: true,
   })

   Transforms.setNodes(editor, {
      type: isActive ? 'paragraph' : isList ? 'list-item' : format,
   })
   if (isList && !isActive) {
      Transforms.wrapNodes(editor, {
         type: format,
         children: [],
      })
   }
}
export const isBlockActive = (editor, format) => {
   const [match] = Editor.nodes(editor, {
      match: (n) =>
         !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === format,
   })

   return !!match
}

const Container = styled.div`
   width: 298px;
   display: flex;
   height: 35px;
   justify-content: space-between;
   align-items: flex-end;
   margin-left: 40px;
   cursor: pointer;
`
const StyledIcon = styled.div`
   width: 34px;
   height: 28px;
   display: flex;
   align-items: center;
   justify-content: center;
   &:hover {
      background: #d4d4d4;
      border-radius: 6px;
   }
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

const toolbar = [
   {
      id: 2,
      format: 'heading',
      type: 'mark',
      icon: <TextIcon />,
      title: 'Заголовок',
   },
   {
      id: 3,
      format: 'bold',
      type: 'mark',
      icon: <BoldIcon />,
      title: 'Жирный текст',
   },
   {
      id: 4,
      format: 'italic',
      type: 'mark',
      icon: <ItalicIcon />,
      title: 'Курсив',
   },
   {
      id: 5,
      format: 'underline',
      type: 'mark',
      icon: <UnderlineIcon />,
      title: 'Подчеркнутый текст',
   },

   {
      id: 15,
      format: 'orderedList',
      type: 'block',
      icon: <OlIcon />,
      title: 'Нумерованный список',
   },
   {
      id: 16,
      format: 'unorderedList',
      type: 'block',
      icon: <UlIcon />,
      title: 'Маркированный список',
   },
]
