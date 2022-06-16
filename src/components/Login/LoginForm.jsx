import styled from '@emotion/styled'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { Button } from '../UI/button/Button'
import { Input } from '../UI/input/Input'

export const LoginForm = ({ onSubmit }) => {
   const { isInvalid } = useSelector((state) => state.auth)

   const {
      register,
      formState: { errors },
      handleSubmit,
   } = useForm({ mode: 'onBlur' })

   const onSubmitUserInfo = (userInfo) => {
      onSubmit(userInfo)
   }

   return (
      <FormContainer onSubmit={handleSubmit(onSubmitUserInfo)}>
         <GreetingContainer>
            <Greeting>
               Добро пожаловать <br /> в<StyledSpan> PEAKSOFT LMS </StyledSpan>!
            </Greeting>
         </GreetingContainer>
         <LoginContainer>
            <StyledLogin>
               <label htmlFor="login">Логин:</label>
               <Input
                  placeholder="Введите логин"
                  id="login"
                  {...register('email', {
                     required: true,
                  })}
                  invalid={errors?.email || (errors && isInvalid)}
                  type="email"
               />
            </StyledLogin>
            <StyledPassword>
               <label htmlFor="password">Пароль:</label>
               <Input
                  placeholder="Введите пароль"
                  id="password"
                  {...register('password', {
                     required: true,
                  })}
                  type="password"
                  invalid={errors?.password || (errors && isInvalid)}
               />
            </StyledPassword>
         </LoginContainer>
         <InvalidContainer>
            {(errors && isInvalid && (
               <StyledInvalidDiv>
                  Неправильно указан логин или пароль
               </StyledInvalidDiv>
            )) ||
               (errors?.password && errors?.email && (
                  <StyledInvalidDiv>
                     Внимание , вы не заполнили все поля !
                  </StyledInvalidDiv>
               ))}
         </InvalidContainer>
         <ButtonContainer>
            <StyledButton type="submit">Войти</StyledButton>
         </ButtonContainer>
      </FormContainer>
   )
}

const FormContainer = styled.form`
   width: 440px;
   height: 391px;
   display: flex;
   flex-direction: column;
   justify-content: space-between;
`
const GreetingContainer = styled.div`
   width: 100%;
   height: 66px;
   display: flex;
   justify-content: center;
`
const StyledSpan = styled.span`
   color: red;
`
const Greeting = styled.div`
   width: 262px;
   height: 66px;
   font-family: 'Open Sans' sans-serif;
   font-style: normal;
   font-weight: 500;
   font-size: 24px;
   line-height: 33px;
   text-align: center;
   color: #1f1f1f;
`
const LoginContainer = styled.div`
   width: 100%;
   height: 170px;
   display: flex;
   justify-content: space-between;
   flex-direction: column;
`
const StyledLogin = styled.div`
   width: 100%;
   height: 74px;
   display: flex;
   justify-content: space-between;
   flex-direction: column;
   & > label {
      display: flex;
      justify-content: start;
      color: #6a6a6a;
   }
`
const StyledPassword = styled.div`
   width: 100%;
   height: 74px;
   display: flex;
   justify-content: space-between;
   flex-direction: column;
   & > label {
      display: flex;
      justify-content: start;
      color: #6a6a6a;
   }
`
const ButtonContainer = styled.div`
   display: flex;
   justify-content: center;
   width: 100%;
   height: 51px;
`
const StyledButton = styled(Button)`
   width: 194px;
   font-family: 'Open Sans' sans-serif;
   font-style: normal;
   font-weight: 500;
   font-size: 20px;
   line-height: 27px;
   text-transform: capitalize;
   color: #ffffff;
   background: #3772ff;
`
const InvalidContainer = styled.div`
   width: 100%;
   height: 20px;
   display: flex;
   justify-content: center;
   align-items: center;
`
const StyledInvalidDiv = styled.div`
   width: 309px;
   font-family: 'Nunito' sans-serif;
   font-style: normal;
   font-weight: 400;
   font-size: 16px;
   line-height: 22px;
   color: #c91e1e;
`
