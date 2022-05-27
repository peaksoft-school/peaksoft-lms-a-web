import styled from '@emotion/styled'
import { TestQuestion } from './TestQuestion'
import { TestTitle } from './TestTitle'

export const LessonTest = () => {
   return (
      <StyledContainer>
         <TestTitle />
         <TestQuestion />
      </StyledContainer>
   )
}

const StyledContainer = styled.div`
   display: grid;
   grid-template-columns: 1fr;
   grid-template-rows: repeat(1, 1fr);
   grid-column-gap: 0px;
   grid-row-gap: 20px;
`
