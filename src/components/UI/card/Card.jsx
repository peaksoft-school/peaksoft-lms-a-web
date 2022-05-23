import styled from '@emotion/styled/macro'
import {
   CardContent,
   CardMedia,
   Typography,
   Card as MuiCard,
} from '@mui/material'
import { NavLink } from 'react-router-dom'
import { MeatBalls } from './MeatBalls'

export const Card = (props) => {
   return (
      <Wrapper>
         <StyledNavLink to={`${props.id}/instructors`}>
            <Container component="img" image={props.image} alt={props.title} />
            <CardContent>
               <StyledTitle>
                  <TitleContainer variant="h5">{props.title}</TitleContainer>
                  <StyledDate variant="p">{props.date}</StyledDate>
               </StyledTitle>
               <StyledDescription>
                  <Typography>{props.description}</Typography>
               </StyledDescription>
            </CardContent>
         </StyledNavLink>
         <StyledIcon>
            <MeatBalls options={props.options} id={props.id} />
         </StyledIcon>
      </Wrapper>
   )
}

const Wrapper = styled(MuiCard)`
   min-width: 270px;
   height: auto;
   border-radius: 10px;
   margin: 10px;
`
const Container = styled(CardMedia)`
   width: 100%;
   height: 171px;
   border-radius: 10px 10px 0px 0px;
`
const StyledTitle = styled.div`
   display: flex;
   justify-content: space-between;
   align-items: center;
   padding-right: 18px;
   height: 30px;
`
const TitleContainer = styled(Typography)`
   font-family: 'Open Sans', sans-serif;
   font-weight: bold;
   font-size: 19px;
   color: #1d293f;
   padding-right: 18px;
   overflow: hidden;
   text-overflow: ellipsis;
   display: -webkit-box;
   -webkit-line-clamp: 1;
   -webkit-box-orient: vertical;
   width: 170px;
`
const StyledDate = styled(Typography)`
   font-family: 'Open Sans', sans-serif;
   font-size: 12px;
   line-height: 140.1%;
   color: #1d293f;
   width: 70px;
`
const StyledDescription = styled.div`
   font-family: 'Open Sans', sans-serif;
   text-align: start;
   font-weight: 400;
   font-size: 16px;
   line-height: 22px;
   color: #1d293f;
   height: 65px;
   margin-top: 10px;
   width: 236px;
   padding: 0px 18px 0 0;
   overflow: hidden;
   text-overflow: ellipsis;
   display: -webkit-box;
   -webkit-line-clamp: 3;
   -webkit-box-orient: vertical;
`
const StyledIcon = styled.div`
   display: flex;
   flex-direction: end;
   justify-content: end;
   padding-bottom: 10px;
`
const StyledNavLink = styled(NavLink)`
   text-decoration: none;
`
