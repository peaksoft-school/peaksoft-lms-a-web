import styled from '@emotion/styled'
import { Button } from '../../UI/button/Button'
import { ReactComponent as AddIcon } from '../../../assets/icons/AddIcon.svg'
import { ReactComponent as Vector } from '../../../assets/icons/Vector.svg'

export const AddStudents = ({ onOpenStudentsModal }) => {
   return (
      <StyledButtons>
         <Button background="none" border="1px solid #3772FF" color="#3772FF">
            <StyledIconVector /> Импорт Excel
         </Button>
         <Button
            background="#3772FF"
            bgHover="#1D60FF"
            bgActive="#6190FF"
            onClick={onOpenStudentsModal}
         >
            <StyledAddIcon /> Добавить студента
         </Button>
      </StyledButtons>
   )
}
const StyledButtons = styled.div`
   width: 415px;
   display: flex;
   justify-content: space-between;
`
const StyledAddIcon = styled(AddIcon)`
   margin-right: 12px;
`
const StyledIconVector = styled(Vector)`
   margin-right: 10px;
`
