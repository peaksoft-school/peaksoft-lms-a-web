import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { useState } from 'react'
import styled from '@emotion/styled/macro'
import { ReactComponent as MeatBallIcon } from '../../assets/icons/meatballs.svg'
import { ReactComponent as PinIcon } from '../../assets/icons/pinnedIcon.svg'
import { ReactComponent as TrashIcon } from '../../assets/icons/trashIcon.svg'
import { ReactComponent as Editcon } from '../../assets/icons/edit.svg'

export const MeatBall = () => {
   const [isOpenMenu, setIsOpenMenu] = useState(false)

   const handleClick = (event) => {
      setIsOpenMenu(event.currentTarget)
   }
   const handleClose = () => {
      setIsOpenMenu(null)
   }

   return (
      <div>
         <Button
            id="basic-button"
            aria-controls={isOpenMenu ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={isOpenMenu ? 'true' : undefined}
            onClick={handleClick}
         >
            <MeatBallIcon />
         </Button>
         <MenuContainer
            id="basic-menu"
            anchorEl={isOpenMenu}
            open={isOpenMenu}
            onClose={handleClose}
            MenuListProps={{
               'aria-labelledby': 'basic-button',
            }}
         >
            <Container onClick={handleClose}>
               <StyledIcon>
                  <PinIcon />
               </StyledIcon>
               Назначить учителя
            </Container>
            <Container onClick={handleClose}>
               <StyledIcon>
                  <Editcon />
               </StyledIcon>
               Редактировать
            </Container>
            <Container onClick={handleClose}>
               <StyledIcon>
                  <TrashIcon />
               </StyledIcon>
               Удалить
            </Container>
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
   font-family: 'Open Sans', sans-serif;
   font-weight: 400;
   font-size: 16px;
   line-height: 22px;
   color: #232323;
   &:hover {
      color: #3772ff;
   }
`
const StyledIcon = styled.div`
   width: 24px;
   height: 24px;
   margin-right: 8px;
`
