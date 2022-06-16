import styled from '@emotion/styled'
import React, { useCallback, useMemo, useRef, useEffect } from 'react'
import { createEditor } from 'slate'
import { Editable, Slate, withReact } from 'slate-react'
import {
   LIST_ITEM,
   ORDERED_LIST,
   UNORDERED_LIST,
} from '../../../../../../utils/constants/general'

export const Text = ({ text }) => {
   const initialValue = useMemo(() => JSON.parse(text.value), [])
   const editorRef = useRef()
   if (!editorRef.current) editorRef.current = withReact(createEditor())
   const editor = editorRef.current

   const renderElement = useCallback((props) => <Element {...props} />, [])

   useEffect(() => {
      const editAble = document.getElementById('1')
      editAble.setAttribute('contenteditable', 'false')
   }, [])
   const renderLeaf = useCallback((props) => {
      return <Leaf {...props} />
   }, [])
   return (
      <StyledEditable disabled editor={editor} value={initialValue}>
         <Editable
            id="1"
            renderElement={renderElement}
            renderLeaf={renderLeaf}
         />
      </StyledEditable>
   )
}

const Element = (props) => {
   const { attributes, children, element } = props

   switch (element.type) {
      case LIST_ITEM:
         return <li {...attributes}>{children}</li>
      case ORDERED_LIST:
         return (
            <ol type="1" {...attributes}>
               {children}
            </ol>
         )
      case UNORDERED_LIST:
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

const StyledEditable = styled(Slate)`
   line-height: 50px;
`
