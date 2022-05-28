import React, { useCallback, useMemo } from 'react'
import styled from '@emotion/styled'
import { createEditor, Editor, Transforms, Text } from 'slate'
import { Tooltip } from '@mui/material'
import { Editable, Slate, withReact } from 'slate-react'
import { ReactComponent as TextIcon } from '../../../assets/icons/simpleText.svg'
import { ReactComponent as IconText } from '../../../assets/icons/text.svg'
import { ReactComponent as ItalicIcon } from '../../../assets/icons/italic.svg'
import { ReactComponent as UnderlineIcon } from '../../../assets/icons/underline.svg'
import { ReactComponent as BoldIcon } from '../../../assets/icons/bold.svg'
import { ReactComponent as UlIcon } from '../../../assets/icons/ulList.svg'
import { ReactComponent as OlIcon } from '../../../assets/icons/olList.svg'
// import { BoldMark } from './BoldMark'
// import { ItalicMark } from './ItalicMark'

export const TextEditor = () => {
   const editor = useMemo(() => withReact(createEditor()), [])

   const renderLeaf = useCallback((props) => {
      return <Leaf {...props} />
   }, [])

   const renderElement = useCallback((props) => {
      switch (props.element.type) {
         case 'i':
            return <i {...props.attributes}>{props.children}</i>
         default:
            return <DefaultElement {...props} />
      }
   }, [])
   const onKeyDown = (event) => {
      if (!event.ctrlKey) {
         return
      }

      switch (event.key) {
         case 'b': {
            event.preventDefault()
            CustomEditor.toggleBoldMark(editor)
            break
         }
         case 'i': {
            event.preventDefault()
            CustomEditor.toggleItalicMark(editor)
            break
         }
         default:
      }
   }
   const onClick = (event) => {
      event.preventDefault()
      CustomEditor.toggleBoldMark(editor)
   }
   const onClickItalic = (event) => {
      event.preventDefault()
      CustomEditor.toggleItalicMark(editor)
   }
   const initialValue = useMemo(
      () =>
         JSON.parse(localStorage.getItem('content')) || [
            {
               type: 'paragraph',
               children: [{ text: 'A line of text in a paragraph.' }],
            },
         ],
      []
   )
   const onChange = (e) => {
      console.log(e)
   }
   // console.log(initialValue)
   return (
      <Slate
         editor={editor}
         value={initialValue}
         onChange={(value) => {
            // console.log(value)
            const isAstChange = editor.operations.some(
               (op) => op.type !== 'set_selection'
            )
            if (isAstChange) {
               // Save the value to Local Storage.
               const content = JSON.stringify(value)
               localStorage.setItem('content', content)
            }
         }}
      >
         <TextEditorContainer>
            <FontEffects>
               <StyledTooltip title="Заголовок" placement="top">
                  <StyledIcon>
                     <TextIcon />
                  </StyledIcon>
               </StyledTooltip>
               <StyledTooltip title="Курсив" placement="top">
                  <StyledIcon onMouseDown={onClickItalic}>
                     <ItalicIcon />
                  </StyledIcon>
               </StyledTooltip>
               <StyledTooltip title="Подчеркнутый текст" placement="top">
                  <StyledIcon>
                     <UnderlineIcon />
                  </StyledIcon>
               </StyledTooltip>
               <StyledTooltip title="Жирный текст" placement="top">
                  <StyledIcon onMouseDown={onClick}>
                     <BoldIcon />
                  </StyledIcon>
               </StyledTooltip>
               <StyledTooltip title="Маркированный список" placement="top">
                  <StyledIcon>
                     <UlIcon />
                  </StyledIcon>
               </StyledTooltip>
               <StyledTooltip title="Нумерованный список" placement="top">
                  <StyledIcon>
                     <OlIcon />
                  </StyledIcon>
               </StyledTooltip>
            </FontEffects>
            <StyledTextEditor>
               <IconText />
               <StyledEditable
                  value={initialValue}
                  onChange={(e) => onChange(e)}
                  editor={editor}
                  placeholder="имя"
                  renderElement={renderElement}
                  renderLeaf={renderLeaf}
                  onKeyDown={onKeyDown}
               />
            </StyledTextEditor>
         </TextEditorContainer>
      </Slate>
   )
}

const CustomEditor = {
   isBoldMarkActive(editor) {
      const [match] = Editor.nodes(editor, {
         match: (n) => n.bold === true,
         universal: true,
      })

      return !!match
   },

   toggleBoldMark(editor) {
      const isActive = CustomEditor.isBoldMarkActive(editor)
      Transforms.setNodes(
         editor,
         { bold: isActive ? null : true },
         { match: (n) => Text.isText(n), split: true }
      )
   },
   isItalicMarkActive(editor) {
      const [match] = Editor.nodes(editor, {
         match: (n) => n.italic === true,
         universal: true,
      })

      return !!match
   },
   toggleItalicMark(editor) {
      const isActive = CustomEditor.isItalicMarkActive(editor)
      Transforms.setNodes(
         editor,
         { italic: isActive ? null : true },
         { match: (n) => Text.isText(n), split: true }
      )
   },
}

const Leaf = (props) => {
   return (
      <span
         {...props.attributes}
         style={{ fontWeight: props.leaf.bold ? 'bold' : 'normal' }}
      >
         {props.children}
      </span>
   )
}

const DefaultElement = (props) => {
   return <p {...props.attributes}>{props.children}</p>
}
const TextEditorContainer = styled.div`
   height: 136px;
`
const FontEffects = styled.div`
   width: 298px;
   display: flex;
   height: 35px;
   justify-content: space-between;
   align-items: flex-end;
   margin-left: 40px;
   cursor: pointer;
`
const StyledTextEditor = styled.div`
   display: flex;
   align-items: center;
   width: 100%;
   height: 40px;
   margin-top: 20px;
   svg {
      margin-right: 8px;
   }
`
const StyledEditable = styled(Editable)`
   padding: 10px 8px 10px 18px;
   background: #ffffff;
   border: 1px solid #d4d4d4;
   border-radius: 10px;
   width: 100%;
   min-height: 100%;
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
