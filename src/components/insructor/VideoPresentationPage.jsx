import React from 'react'
import styled from '@emotion/styled'

export const VideoPresentationPage = (props) => {
   return (
      <VideoPresentationContainer>
         <div>
            <h1>{props.title}</h1>
         </div>
         <div>
            <p>{props.VideoPresentationDescription}</p>
         </div>

         <div>
            <iframe
               width="792"
               height="464"
               src="https://www.youtube.com/embed/C-AFpwNrPRU"
               title="YouTube video player"
               frameBorder="10"
               allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
               allowFullScreen
            />
         </div>
      </VideoPresentationContainer>
   )
}
const VideoPresentationContainer = styled.div`
   width: 1140px;
   background-color: #ffffff;
   border-radius: 10px;
   margin: 40px;
   padding: 30px;
   & p {
      padding: 20px;
   }
   & h1 {
      padding: 20px;
   }
   & iframe {
      padding: 20px;
      border-radius: 10px;
   }
`
