import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { useState } from 'react'
import styled from '@emotion/styled/macro'
import { ReactComponent as ArrowIcon } from '../../../assets/icons/Arrows.svg'

export const Logout = () => {
   const [anchorEl, setAnchorEl] = useState(null)
   const open = Boolean(anchorEl)

   const handleClick = (event) => {
      setAnchorEl(event.currentTarget)
   }
   const handleClose = () => {
      setAnchorEl(null)
   }

   return (
      <div>
         <StyledButton
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
         >
            <ArrowIcon />
         </StyledButton>
         <MenuContainer
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
               'aria-labelledby': 'basic-button',
            }}
         >
            <MenuItem onClick={handleClose}>Profile</MenuItem>
         </MenuContainer>
      </div>
   )
}

const MenuContainer = styled(Menu)`
   .MuiMenu-root {
      border-radius: 10px;
   }
   .MuiMenu-paper {
      border-radius: 10px;
      width: 218px;
   }
`
const StyledButton = styled(Button)`
   .MuiButton-root {
      padding: 0px;
      width: 0px;
   }
`
const Container = styled(MenuItem)`
   height: 44px;
   min-width: 218px;
   display: flex;
   align-items: center;
   justify-content: start;
   font-family: 'Open Sans', sans-serif;
   font-weight: 400;
   font-size: 16px;
   line-height: 22px;
   color: #232323;
   &:hover {
      color: #3772ff;
   }
`
