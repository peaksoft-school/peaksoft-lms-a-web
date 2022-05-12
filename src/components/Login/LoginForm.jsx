import styled from '@emotion/styled'
import { Button } from '../UI/Button'
import { Input } from '../UI/Input'

export const LoginForm = ({
   onSubmit,
   login,
   password,
   errors,
   buttonType,
   invalid,
   passwordType,
   emailType,
}) => {
   return (
      <FormContainer onSubmit={onSubmit}>
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
                  {...login}
                  invalid={errors?.email && invalid}
                  type={emailType}
               />
            </StyledLogin>
            <StyledPassword>
               <label htmlFor="password">Пароль:</label>
               <Input
                  placeholder="Введите пароль"
                  id="password"
                  {...password}
                  type={passwordType}
                  invalid={errors?.password && invalid}
               />
            </StyledPassword>
         </LoginContainer>
         <InvalidContainer>
            {(errors?.password && (
               <StyledInvalidDiv>
                  Неправильно указан логин и/или пароль
               </StyledInvalidDiv>
            )) ||
               (errors?.email && (
                  <StyledInvalidDiv>
                     Неправильно указан логин и/или пароль
                  </StyledInvalidDiv>
               ))}
         </InvalidContainer>
         <ButtonContainer>
            <Button background="#3772FF" type={buttonType}>
               <StyledButtonLabel>Войти</StyledButtonLabel>
            </Button>
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
const StyledButtonLabel = styled.div`
   width: 194px;
   font-family: 'Open Sans' sans-serif;
   font-style: normal;
   font-weight: 500;
   font-size: 20px;
   line-height: 27px;
   text-transform: capitalize;
   color: #ffffff;
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
