import styled from '@emotion/styled'
import { useState } from 'react'
import { ReactComponent as CloseSelect } from '../../../assets/icons/selected.svg'
import { ReactComponent as RemoveSelect } from '../../../assets/icons/removeSelect.svg'
import { ReactComponent as OpenSelect } from '../../../assets/icons/arrow.svg'

export const MultiSelect = ({
   options,
   title,
   onSelected,
   selectedOptions,
   setSelectedOptions,
}) => {
   const [openMultiSelect, setOpenMultiSelect] = useState(false)
   const [userOptions, setUserOptions] = useState(options)

   const toggleSelection = () => setOpenMultiSelect(!openMultiSelect)

   const addMultiSelectHandler = (id, option) => {
      setSelectedOptions((prev) => [...prev, option])
      onSelected(option)
      setUserOptions(userOptions.filter((option) => option.id !== id))
   }
   const removeSelectedOptions = (id, selected) => {
      setSelectedOptions(selectedOptions.filter((option) => option.id !== id))
      setUserOptions((prev) => [...prev, selected])
   }

   return (
      <Container>
         <StyledUl>
            {selectedOptions.map((selected) => (
               <li key={selected.id}>
                  <p>{selected.name}</p>
                  <RemoveSelect
                     style={{ marginTop: '3px' }}
                     role="presentation"
                     onClick={() =>
                        removeSelectedOptions(selected.id, selected)
                     }
                  />
               </li>
            ))}
         </StyledUl>
         <StyledSelect onClick={toggleSelection} role="presentation">
            {openMultiSelect ? <p>{title}</p> : <p>Выберите учителя</p>}
            {openMultiSelect ? <OpenSelect /> : <CloseSelect />}
         </StyledSelect>
         {openMultiSelect && (
            <StyledMultiItems>
               {userOptions.length > 0
                  ? userOptions.map((option) => (
                       <li
                          key={option.id}
                          role="presentation"
                          onClick={() =>
                             addMultiSelectHandler(option.id, option)
                          }
                       >
                          <p>{option.name}</p>
                          <label className="custom-checkbox">
                             <input type="checkbox" />
                             <span className="checkmark"> </span>
                          </label>
                       </li>
                    ))
                  : 'Teacher Not Found'}
            </StyledMultiItems>
         )}
      </Container>
   )
}

const Container = styled.div`
   font-size: 16px;
   font-weight: 400;
   width: 100%;
`
const StyledSelect = styled.div`
   display: flex;
   justify-content: space-between;
   align-items: center;
   height: 42px;
   border: 1.8px solid #8d9bb9;
   border-radius: 10px;
   padding: 7px 18px 10px 18px;
   margin: 13px 0;
   color: #00125b;
   font-weight: 600;
`
const StyledMultiItems = styled.ul`
   display: flex;
   flex-direction: column;
   border-radius: 8px;
   border: 1px solid #00156a;
   border-radius: 10px;
   margin-top: 8px;
   max-height: 180px;
   padding: 10px;
   overflow-y: scroll;
   ::-webkit-scrollbar {
      width: 8px;
   }

   ::-webkit-scrollbar-track {
      box-shadow: inset 0 0 5px #3772ff;
      border-radius: 10px;
   }

   ::-webkit-scrollbar-thumb {
      background: #3772ff;
      border-radius: 10px;
   }

   ::-webkit-scrollbar-thumb:hover {
      background: #3772ff;
   }
   li {
      display: flex;
      justify-content: space-between;
      list-style: none;
      height: 43px;
      padding: 9px 18px 10px 18px;
      border-bottom: 1px solid #ececec;
      &:hover {
      }
   }
   .custom-checkbox {
      height: 12px;
      width: 12px;
      cursor: pointer;
      input {
         display: none;
      }
      .checkmark {
         width: 100%;
         height: 100%;
         border: 2px solid #000000;
         display: inline-block;
         :hover {
            border: 2px solid #3772ff;
         }
         :active {
            background-image: url();
         }
      }
   }
`
const StyledUl = styled.ul`
   max-height: 100px;
   overflow-y: scroll;
   border-radius: 10px;
   ::-webkit-scrollbar {
      width: 8px;
   }

   ::-webkit-scrollbar-track {
      box-shadow: inset 0 0 5px #3772ff;
      border-radius: 8px;
   }

   ::-webkit-scrollbar-thumb {
      background: #3772ff;
      border-radius: 10px;
   }

   ::-webkit-scrollbar-thumb:hover {
      background: #3772ff;
   }
   li {
      display: flex;
      justify-content: space-between;
      list-style: none;
      margin-bottom: 8px;
      height: 42px;
      border: 1px solid #8e9ba6;
      border-radius: 10px;
      padding: 7px 12px 10px 18px;
   }
`
