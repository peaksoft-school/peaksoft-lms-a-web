import styled from '@emotion/styled'
import React from 'react'
import { ReactEditor, useSlate } from 'slate-react'
import { Editor, Transforms, Element as SlateElement } from 'slate'
import {
   BLOCK,
   LIST_ITEM,
   MARK,
   ORDERED_LIST,
   PARAGRAPH,
   TOOLBAR,
   UNORDERED_LIST,
} from '../../../../utils/constants/general'
import { StyledTooltip } from '../../../UI/tooltip/StyledTooltip'

export const Toolbar = () => {
   const editor = useSlate()

   const MarkButton = ({ format, title, icon }) => {
      return (
         <StyledTooltip title={title}>
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
         <StyledTooltip title={title}>
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
         {TOOLBAR.map((el) => {
            switch (el.type) {
               case MARK:
                  return <MarkButton key={el.id} {...el} />
               case BLOCK:
                  return <BlockButton key={el.id} {...el} />
               default:
                  return <DefaultElement {...el} key={el.id} />
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

   return marks && marks[format]
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
const listTypes = [ORDERED_LIST, UNORDERED_LIST]

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
      type: isActive ? PARAGRAPH : isList ? LIST_ITEM : format,
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
   margin-top: 20px;
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
