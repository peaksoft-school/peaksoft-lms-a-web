import styled from '@emotion/styled'
import { ReactComponent as PeaksoftBoy } from '../../assets/icons/PeaksoftBoy.svg'
import { LoginForm } from '../../components/Login/LoginForm'

export const Login = () => {
   return (
      <LoginContainer>
         <LeftSide>
            <PeaksoftBoy />
         </LeftSide>
         <RightSide>
            <LoginForm />
         </RightSide>
      </LoginContainer>
   )
}

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
