/* eslint-disable no-param-reassign */
import React, { useCallback, useMemo, useRef } from 'react'
import styled from '@emotion/styled'
import { createEditor } from 'slate'
import { Editable, Slate, withReact } from 'slate-react'
import { useDispatch } from 'react-redux'
import { ReactComponent as IconText } from '../../../../assets/icons/text.svg'
import { Toolbar } from './Toolbar'
import { taskActions } from '../../../../store/INSTRUCTOR/task-slice'
import { ReactComponent as RemoveIcon } from '../../../../assets/icons/deleteIcon.svg'
import {
   LIST_ITEM,
   ORDERED_LIST,
   PARAGRAPH,
   UNORDERED_LIST,
} from '../../../../utils/constants/general'

export const TextEditor = ({ text }) => {
   const dispatch = useDispatch()
   const hasTextValue = () => {
      return Object.values(text).includes(text.value)
   }
   const initialValue = useMemo(
      () =>
         (hasTextValue() && JSON.parse(text.value)) || [
            {
               type: PARAGRAPH,
               children: [{ text: '' }],
            },
         ],
      []
   )

   const changeTextHandler = (value) => {
      dispatch(
         taskActions.setText({
            textValue: JSON.stringify(value),
            name: 'text',
            id: text.id,
         })
      )
   }

   const editorRef = useRef()
   if (!editorRef.current) editorRef.current = withReact(createEditor())
   const editor = editorRef.current

   const renderElement = useCallback((props) => <Element {...props} />, [])

   const renderLeaf = useCallback((props) => {
      return <Leaf {...props} />
   }, [])

   const deleteTextHandler = (id) => {
      dispatch(taskActions.deleteTask(id))
   }
   return (
      <Slate
         editor={editor}
         value={initialValue}
         onChange={(initialValue) => changeTextHandler(initialValue)}
      >
         <TextEditorContainer>
            <Toolbar />
            <StyledTextEditor>
               <StyledIcon id="container">
                  <RemoveIcon
                     id="remove"
                     onClick={() => deleteTextHandler(text.id)}
                  />
                  <IconText id="text" />
               </StyledIcon>

               <StyledEditable
                  placeholder="имя"
                  renderElement={renderElement}
                  renderLeaf={renderLeaf}
               />
            </StyledTextEditor>
         </TextEditorContainer>
      </Slate>
   )
}

const Element = (props) => {
   const { attributes, children, element } = props

   switch (element.type) {
      case LIST_ITEM:
         return <li {...attributes}>{children}</li>
      case ORDERED_LIST:
         return (
            <StyledOl type="1" {...attributes}>
               {children}
            </StyledOl>
         )
      case UNORDERED_LIST:
         return <StyledUl {...attributes}>{children}</StyledUl>

      default:
         return <p {...attributes}>{children}</p>
   }
}
const Leaf = ({ attributes, children, leaf }) => {
   if (leaf.bold) {
      children = <strong>{children}</strong>
   }

   if (leaf.italic) {
      children = <em>{children}</em>
   }

   if (leaf.underline) {
      children = <u>{children}</u>
   }
   if (leaf.heading) {
      children = <h1>{children}</h1>
   }

   return <span {...attributes}>{children}</span>
}

const TextEditorContainer = styled.div`
   min-height: 136px;
`
const StyledOl = styled.ol`
   padding-left: 10px;
`
const StyledUl = styled.ul`
   padding-left: 10px;
`
const StyledTextEditor = styled.div`
   display: flex;
   width: 100%;
   min-height: 40px;
   margin-top: 20px;
   #remove {
      display: none;
   }
   &:hover {
      #remove {
         display: block;
      }
      #text {
         display: none;
      }
      #container {
         background: #c4c4c4;
         border-radius: 3px;
      }
   }
`
const StyledEditable = styled(Editable)`
   margin-left: 5px;
   padding: 10px 8px 10px 20px;
   background: #ffffff;
   border: 1px solid #d4d4d4;
   border-radius: 10px;
   width: 100%;
   height: 100%;
`
const StyledIcon = styled.div`
   width: 27px;
   height: 28px;
   display: flex;
   align-items: center;
   justify-content: center;
   margin-right: 10px;
   margin-top: 8px;
   cursor: pointer;
   &:hover {
      background: #c4c4c4;
      border-radius: 3px;
   }
`
