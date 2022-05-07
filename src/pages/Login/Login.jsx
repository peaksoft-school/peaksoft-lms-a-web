import styled from '@emotion/styled'
import { forwardRef } from 'react'
import { useForm } from 'react-hook-form'
import { ReactComponent as PeaksoftBoy } from '../../assets/icons/PeaksoftBoy.svg'
import { LoginForm } from '../../components/Login/LoginForm'

export const Login = forwardRef(() => {
   const {
      register,
      formState: { errors, isValid },
      handleSubmit,
      reset,
   } = useForm()
   const onSubmitUserInfo = (userInfo) => {
      console.log(userInfo)
      reset()
   }
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
                     validate: (value) => value === 'baiaaly@gmail.com',
                  }),
               }}
               password={{
                  ...register('password', {
                     required: true,
                     pattern: /^[A-Za-z\d]{5,}$/,
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
