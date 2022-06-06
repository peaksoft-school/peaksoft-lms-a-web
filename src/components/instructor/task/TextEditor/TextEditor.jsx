import React, { useCallback, useEffect, useRef, useState } from 'react'
import styled from '@emotion/styled'
import { createEditor } from 'slate'
import { Editable, Slate, withReact } from 'slate-react'
import { useDispatch } from 'react-redux'
import uuid from 'react-uuid'
import { ReactComponent as IconText } from '../../../../assets/icons/text.svg'
import { Toolbar } from './Toolbar'
import { taskActions } from '../../../../store/task-slice'
import { TEXT } from '../../../../utils/constants/general'
import { ReactComponent as RemoveIcon } from '../../../../assets/icons/deleteIcon.svg'

export const TextEditor = ({ text }) => {
   const dispatch = useDispatch()
   const [value, setValue] = useState([
      {
         type: 'paragraph',
         children: [{ text: 'A line of text in a paragraph.' }],
      },
   ])

   // useEffect(() => {
   //    value.map((text) => {
   //       text.children.map((el) => {
   //          return el
   //       })
   //       return text
   //    })
   // }, [value])

   useEffect(() => {
      dispatch(
         taskActions.addText({
            textValue: value,
            id: text.id,
         })
      )
   }, [value])

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
         value={value}
         onChange={(value) => {
            setValue(value)
         }}
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
      case 'list-item':
         return <li {...attributes}>{children}</li>
      case 'orderedList':
         return (
            <ol type="1" {...attributes}>
               {children}
            </ol>
         )
      case 'unorderedList':
         return <ul {...attributes}>{children}</ul>

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
   padding: 10px 8px 10px 18px;
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
