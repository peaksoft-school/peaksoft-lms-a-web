import styled from '@emotion/styled'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { ReactComponent as PeaksoftBoy } from '../../assets/icons/PeaksoftBoy.svg'
import { LoginForm } from '../../components/Login/LoginForm'
import { signIn } from '../../store/authSlice'
import { AUTH_KEY, ROUTES } from '../../utils/constants/general'
import { localStorageHelper } from '../../utils/helpers/general'

export const Login = () => {
   const dispatch = useDispatch()
   const navigate = useNavigate()
   const { user } = useSelector((state) => state.auth)

   const onSubmitUserInfo = (userInfo) => {
      dispatch(signIn(userInfo))
   }

   useEffect(() => {
      if (user.role === 'ADMIN') {
         navigate(ROUTES.ADMIN)
      }
      if (user.role === 'STUDENT') {
         navigate(ROUTES.STUDENT)
      }
      if (user.role === 'INSTRUCTOR') {
         navigate(ROUTES.INSTRUCTOR)
      }
   }, [user])

   useEffect(() => {
      window.onbeforeunload = () => {
         return localStorageHelper.store(AUTH_KEY, user)
      }
   }, [user])

   return (
      <LoginContainer>
         <LeftSide>
            <PeaksoftBoy />
         </LeftSide>
         <RightSide>
            <LoginForm onSubmit={onSubmitUserInfo} />
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
