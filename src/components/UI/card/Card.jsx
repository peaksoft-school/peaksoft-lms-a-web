import styled from '@emotion/styled/macro'
import {
   CardContent,
   CardMedia,
   Typography,
   Card as MuiCard,
} from '@mui/material'
import { MeatBalls } from './MeatBalls'

export const Card = (props) => {
   return (
      <Wrapper>
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
         <StyledIcon>
            <MeatBalls
               options={props.options}
               action={props.action}
               card={props.cards}
            />
         </StyledIcon>
      </Wrapper>
   )
}

const Wrapper = styled(MuiCard)`
   min-width: 270px;
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
`
const TitleContainer = styled(Typography)`
   font-family: 'Open Sans', sans-serif;
   font-weight: bold;
   font-size: 19px;
   color: #1d293f;
   padding-right: 18px;
`
const StyledDate = styled(Typography)`
   font-family: 'Open Sans', sans-serif;
   font-size: 12px;
   line-height: 140.1%;
   color: #1d293f;
`
const StyledDescription = styled.div`
   font-family: 'Open Sans', sans-serif;
   text-align: start;
   font-weight: 400;
   font-size: 16px;
   line-height: 22px;
   color: #1d293f;
   margin-top: 10px;
   width: 236px;
   padding: 0px 18px 0 0;
`
const StyledIcon = styled.div`
   display: flex;
   flex-direction: end;
   justify-content: end;
   padding-bottom: 10px;
`
