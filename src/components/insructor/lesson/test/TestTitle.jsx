import styled from '@emotion/styled'
import { Input } from '../../../UI/input/Input'

export const TestTitle = () => {
   return (
      <StyledTitleContainer>
         <StyledTitle>Название теста</StyledTitle>
         <Input placeholder="Введите название теста" />
      </StyledTitleContainer>
   )
}

const StyledTitleContainer = styled.div`
   min-width: 1140px;
   height: 144px;
   display: flex;
   justify-content: space-around;
   align-items: center;
   flex-direction: column;
   padding: 20px;
   background: #ffffff;
   border: 1px solid #d4d4d4;
   border-radius: 10px;
`
const StyledTitle = styled.div`
   width: 100%;
   height: 22px;
   display: flex;
   align-items: center;
   justify-content: flex-start;
   font-family: 'Open Sans' sans-serif;
   font-style: normal;
   font-weight: 600;
   font-size: 18px;
   line-height: 22px;
   color: #1f6ed4;
`
