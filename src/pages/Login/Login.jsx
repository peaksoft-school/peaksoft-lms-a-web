import styled from '@emotion/styled'
import { forwardRef, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { ReactComponent as PeaksoftBoy } from '../../assets/icons/PeaksoftBoy.svg'
import { LoginForm } from '../../components/Login/LoginForm'
import { signIn } from '../../store/authSlice'
import { ROUTES } from '../../utils/constants/general'
import { localStorageHelper } from '../../utils/helpers/general'

export const Login = forwardRef(() => {
   const dispatch = useDispatch()
   const naviagate = useNavigate()
   const { user, isInvalid } = useSelector((state) => state.auth)
   const {
      register,
      formState: { errors },
      handleSubmit,
   } = useForm()
   const onSubmitUserInfo = (userInfo) => {
      dispatch(signIn(userInfo))
   }
   useEffect(() => {
      if (user.role === 'ADMIN') {
         naviagate(ROUTES.ADMIN)
      }
      if (user.role === 'STUDENT') {
         naviagate(ROUTES.STUDENT)
      }
      if (user.role === 'INSTRUCTOR') {
         naviagate(ROUTES.INSTRUCTOR)
      }
   }, [])
   useEffect(() => {
      window.onbeforeunload = () => {
         return localStorageHelper.store('@peaksoft-lms', user)
      }
   }, [user])
   return (
      <LoginContainer>
         <LeftSide>
            <PeaksoftBoy />
         </LeftSide>
         <RightSide>
            <LoginForm
               onSubmit={handleSubmit(onSubmitUserInfo)}
               login={{
                  ...register('email', {
                     required: true,
                  }),
               }}
               emailType="email"
               password={{
                  ...register('password', {
                     required: true,
                  }),
               }}
               passwordType="password"
               errors={errors && isInvalid}
               buttonType="submit"
            />
         </RightSide>
      </LoginContainer>
   )
})

const LoginContainer = styled.div`
   width: 100%;
   height: 100vh;
   display: flex;
`
const LeftSide = styled.div`
   height: 100%;
   width: 45%;
   background: #3772ff;
   display: flex;
   justify-content: center;
   align-items: center;
`
const RightSide = styled.div`
   width: 55%;
   height: 100%;
   background: #ffffff;
   display: flex;
   justify-content: center;
   align-items: center;
`
