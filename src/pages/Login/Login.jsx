import styled from '@emotion/styled'
import { forwardRef, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { ReactComponent as PeaksoftBoy } from '../../assets/icons/PeaksoftBoy.svg'
import { LoginForm } from '../../components/Login/LoginForm'
import { signIn } from '../../store/authSlice'
import { localStorageHelper } from '../../utils/helpers/general'

export const Login = forwardRef(() => {
   const dispatch = useDispatch()
   const { user, error } = useSelector((state) => state.auth)
   const {
      register,
      formState: { errors, isValid },
      handleSubmit,
      reset,
   } = useForm()
   const onSubmitUserInfo = (userInfo) => {
      dispatch(signIn(userInfo))
      reset()
   }
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
               errors={errors}
               buttonType="submit"
               invalid={!isValid}
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
