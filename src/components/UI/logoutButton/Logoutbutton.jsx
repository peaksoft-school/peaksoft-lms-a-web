import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { useState } from 'react'
import styled from '@emotion/styled/macro'
import { ReactComponent as ArrowIcon } from '../../../assets/icons/Arrows.svg'
import { ReactComponent as LogoutIcon } from '../../../assets/icons/logout.svg'

export const LogoutButton = ({ logoutHandler }) => {
   const [anchorEl, setAnchorEl] = useState(null)
   const open = Boolean(anchorEl)

   const handleClick = (event) => {
      setAnchorEl(event.currentTarget)
   }
   const handleClose = () => {
      setAnchorEl(null)
   }
   const handleLogout = () => {
      logoutHandler()
      setAnchorEl(null)
   }

   return (
      <div>
         <ArrowIcon
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
         />
         <MenuContainer
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
               'aria-labelledby': 'basic-button',
            }}
         >
            <Container onClick={handleLogout}>
               <LogoutIcon />
               Выйти
            </Container>
         </MenuContainer>
      </div>
   )
}

const MenuContainer = styled(Menu)`
   .MuiMenu-root {
      border-radius: 10px;
      left: 500px;
   }
   .MuiMenu-paper {
      border-radius: 10px;
      width: 200px;
      margin-top: 10px;
      padding: 0;
   }
   .MuiMenu-list {
      padding: 0px;
   }
`

const Container = styled(MenuItem)`
   display: flex;
   border-radius: 10px;
   width: 200px;
   height: 56px;
   padding: 0px 90px 0px 20px;
   background: #dde9f9;
   border: 1px solid #3772ff;
   box-shadow: 0px 4px 16px rgba(36, 36, 36, 0.05);
   display: flex;
   align-items: center;
   justify-content: space-between;
   &:focus {
      background-color: #dde9f9;
   }
`
