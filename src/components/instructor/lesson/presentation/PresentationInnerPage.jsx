import React, { useEffect } from 'react'
import styled from '@emotion/styled'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import PowerPoint from '../../../../assets/images/PowerPoint.png'
import PDF from '../../../../assets/images/PDF.png'
import { getPresentation } from '../../../../store/INSTRUCTOR/presentation-slice'

const PresentationInnerPage = () => {
   const dispatch = useDispatch()

   const { singlePresentation } = useSelector((state) => state.presentation)

   const { presentationId } = useParams()

   useEffect(() => {
      if (presentationId) {
         dispatch(getPresentation(presentationId))
      }
   }, [])

   const presentationType = singlePresentation?.presentationLink.includes('pdf')

   const presentationTypeImage = presentationType ? (
      <div>
         <img src={PDF} alt="PDF" />
      </div>
   ) : (
      <div>
         <img src={PowerPoint} alt="powerpoint" />
      </div>
   )

   return (
      <PresentationContainer>
         <div>
            <h2>{singlePresentation?.presentationName}</h2>
         </div>
         <div>
            <p>{singlePresentation?.description}</p>
         </div>
         <LinkStyle>
            {presentationTypeImage}
            <div>
               <a href={singlePresentation?.presentationLink}>
                  Скачать презентацию
               </a>
            </div>
         </LinkStyle>
      </PresentationContainer>
   )
}
const PresentationContainer = styled.div`
   width: 100%;
   background-color: #ffffff;
   border-radius: 10px;
   padding: 30px;
   margin-top: 24px;
   & p {
      padding: 20px;
      color: #000000;
      line-height: 30px;
      word-wrap: break-word;
   }
   & h2 {
      padding: 20px;
      word-wrap: break-word;
      color: #000000;
   }
   & a {
      margin-left: 20px;
   }
   & img {
      width: 150px;
   }
`
const LinkStyle = styled.div`
   display: flex;
   align-items: center;
   justify-content: center;
   width: 400px;
`

export default PresentationInnerPage
