/* eslint-disable no-param-reassign */
import React, { useCallback, useRef, useState } from 'react'
import styled from '@emotion/styled'
import { createEditor } from 'slate'
import { Editable, Slate, withReact } from 'slate-react'
import { ReactComponent as IconText } from '../../../../assets/icons/text.svg'
import { Toolbar } from './Toolbar'

export const TextEditor = () => {
   const editorRef = useRef()
   if (!editorRef.current) editorRef.current = withReact(createEditor())
   const editor = editorRef.current

   const [value, setValue] = useState(
      JSON.parse(localStorage.getItem('content')) || [
         {
            type: 'paragraph',
            children: [{ text: 'A line of text in a paragraph.' }],
         },
      ]
   )
   const renderElement = useCallback((props) => <Element {...props} />, [])

   const renderLeaf = useCallback((props) => {
      return <Leaf {...props} />
   }, [])

   return (
      <Slate
         editor={editor}
         value={value}
         onChange={(value) => {
            const content = JSON.stringify(value)
            localStorage.setItem('content', content)
         }}
      >
         <TextEditorContainer>
            <Toolbar />
            <StyledTextEditor>
               <IconText />
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
   svg {
      margin-top: 9px;
      margin-right: 8px;
   }
`
const StyledEditable = styled(Editable)`
   padding: 10px 8px 10px 18px;
   background: #ffffff;
   border: 1px solid #d4d4d4;
   border-radius: 10px;
   width: 100%;
   height: 100%;
`
