import React, { useState } from 'react'
import {
   OutlinedInput,
   MenuItem,
   FormControl,
   ListItemText,
   Select,
   Checkbox,
} from '@mui/material'
import styled from '@emotion/styled'
import icons from '../../assets/icons/removeSelect.svg'

export const MultiSelect = ({ data, selectedUsers, setSelectedUsers }) => {
   const [personName, setPersonName] = useState([])

   const handleChange = (event) => {
      setPersonName(event.target.value)
   }

   const addHandler = () => {
      setSelectedUsers(personName)
   }

   const deleteHandler = (id) => {
      setSelectedUsers(
         selectedUsers.filter((selectedUser) => selectedUser.id !== id)
      )
   }
   return (
      <div>
         <StyledUl>
            {selectedUsers.map((el) => (
               <li key={el.id}>
                  <p>{el.name}</p>
                  <img
                     src={icons}
                     alt="icons"
                     role="presentation"
                     onClick={() => deleteHandler(el.id)}
                  />
               </li>
            ))}
         </StyledUl>
         <StyledForm fullWidth>
            <Select
               multiple
               displayEmpty
               value={personName}
               onChange={handleChange}
               onClose={addHandler}
               input={<OutlinedInput />}
               renderValue={(selected) =>
                  selected.map((value) => (
                     <div key={value.id} label={value.name} />
                  ))
               }
            >
               {data.map((name) => (
                  <StyledMenuItem key={name.id} value={name}>
                     <ListItemText primary={name.name} />
                     <Checkbox checked={personName.indexOf(name) > -1} />
                  </StyledMenuItem>
               ))}
            </Select>
         </StyledForm>
      </div>
   )
}

const StyledForm = styled(FormControl)`
   width: 100%;
   .MuiInputBase-root {
      border-radius: 10px;
      height: 42px;
   }
   .MuiInputLabel-root {
      top: -7px;
   }
`
const StyledMenuItem = styled(MenuItem)`
   border-bottom: 1px solid #1a237e12;
   .MuiButtonBase-root:hover {
      color: #3772ff;
   }
   .MuiTypography-root {
      font-size: 16px;
      color: #000000;
   }
   .MuiSvgIcon-root {
      font-size: 17px;
   }
`
const StyledUl = styled.ul`
   width: 100%;
   img {
      padding-right: 18px;
      height: 20px;
   }
   li {
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-radius: 10px;
      color: #000000;
      border: 1px solid #d4d4d4;
      list-style: none;
      height: 42px;
      margin: 8px;
      padding-left: 16px;
   }
   p {
      font-size: 18px;
   }
`
