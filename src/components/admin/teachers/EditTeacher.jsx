import styled from '@emotion/styled'
import { useDispatch } from 'react-redux'
import { useInput } from '../../../hooks/useInput/useInput'
import { editTeacher } from '../../../store/teachers-slice'
import { Button } from '../../UI/button/Button'
import { Input } from '../../UI/input/Input'
import { MaskedInput } from '../../UI/input/MaskedInput'
import { BasicModal } from '../../UI/modal/BasicModal'

export const EditTeacher = ({
   setEditSearchParams,
   editTeacherModal,
   singleTeacher,
}) => {
   const dispatch = useDispatch()
   const { id, fullName, phoneNumber, email, specialization } = singleTeacher

   const handleClose = () => {
      setEditSearchParams()
   }

   const [firstName, lastName] = fullName.split(' ')
   const { value, onChange } = useInput({
      firstName: firstName || '',
      lastName: lastName || '',
      phoneNumber: phoneNumber || '',
      email: email || '',
      password: '',
      specialization: specialization || '',
   })

   const onSubmit = () => {
      dispatch(editTeacher({ id, teacherInfo: value }))
      setEditSearchParams()
   }

   return (
      <BasicModal
         isModalOpen={Boolean(editTeacherModal)}
         onClose={handleClose}
         title="Редактировать учителя"
      >
         <StyledInput
            placeholder="Имя"
            type="text"
            name="firstName"
            value={value.firstName}
            onChange={onChange}
         />
         <StyledInput
            placeholder="Фамилия"
            type="text"
            name="lastName"
            value={value.lastName}
            onChange={onChange}
         />
         <StyledMaskedInput
            name="phoneNumber"
            value={value.phoneNumber}
            onChange={onChange}
         />
         <StyledInput
            placeholder="Email"
            type="email"
            name="email"
            value={value.email}
            onChange={onChange}
         />
         <StyledInput
            placeholder="Пароль"
            type="password"
            name="password"
            value={value.password}
            onChange={onChange}
         />
         <StyledInput
            placeholder="Специализация"
            type="text"
            name="specialization"
            value={value.specialization}
            onChange={onChange}
         />
         <StyledModalButton>
            <div>
               <Button
                  background="none"
                  bgHover="#1D60FF1A"
                  bgActive="#6190FF4D"
                  border="1px solid #1D60FF"
                  color="#3772FF"
                  onClick={() => setEditSearchParams()}
               >
                  Отмена
               </Button>
               <Button
                  background="#3772FF"
                  bgHover="#1D60FF"
                  bgActive="#6190FF"
                  onClick={onSubmit}
               >
                  Сохранить
               </Button>
            </div>
         </StyledModalButton>
      </BasicModal>
   )
}

const StyledInput = styled(Input)`
   margin: 5px;
`
const StyledMaskedInput = styled(MaskedInput)`
   margin: 5px;
`
const StyledModalButton = styled.div`
   display: flex;
   justify-content: end;
   width: 100%;
   margin-top: 16px;
   div {
      width: 250px;
      display: flex;
      justify-content: space-around;
   }
`
