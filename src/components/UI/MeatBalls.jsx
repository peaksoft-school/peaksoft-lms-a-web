import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { useState } from 'react'
import styled from '@emotion/styled/macro'
import { ReactComponent as MeatBallIcon } from '../../assets/icons/meatballs.svg'

export const MeatBalls = (props) => {
   const [anchorEl, setAnchorEl] = useState(null)
   const open = Boolean(anchorEl)

   const handleClick = (event) => {
      setAnchorEl(event.currentTarget)
   }
   const handleClose = (action) => {
      action()
      setAnchorEl(null)
   }

   return (
      <div>
         <Button
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
         >
            <MeatBallIcon />
         </Button>
         <MenuContainer
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
               'aria-labelledby': 'basic-button',
            }}
         >
            {props.options.map((option) => {
               return (
                  <Container
                     onClick={() => handleClose(option.action)}
                     key={option.id}
                  >
                     {option.content}
                  </Container>
               )
            })}
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
const Container = styled(MenuItem)`
   height: 44px;
   min-width: 218px;
   display: flex;
   align-items: center;
   justify-content: start;
   flex-direction: column;
   font-family: 'Open Sans', sans-serif;
   font-weight: 400;
   font-size: 16px;
   line-height: 22px;
   color: #232323;
   &:hover {
      color: #3772ff;
   }
`
