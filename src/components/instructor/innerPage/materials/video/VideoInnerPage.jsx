import React from 'react'
import styled from '@emotion/styled'
import { useSelector } from 'react-redux'
import ReactPlayer from 'react-player'

import { Spinner } from '../../../../UI/Spinner/Spinner'

export const VideoInnerPage = (props) => {
   const { isLoading } = useSelector((state) => state.video)

   const { videoName, description, videoLink } = useSelector(
      (state) => state.video.singleVideo
   )
   console.log(videoName)

   return (
      <div>
         {(isLoading && <Spinner />) || (
            <VideoPresentationContainer>
               <div>
                  <h2>{videoName}</h2>
               </div>
               <div>
                  <p>{description}</p>
               </div>

               <div>
                  <ReactPlayer
                     width="792px"
                     height="464px"
                     border-radius="10px"
                     muted
                     playing
                     controls
                     url={videoLink}
                  />
               </div>
            </VideoPresentationContainer>
         )}
      </div>
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
      color: #000000;
      line-height: 30px;
      word-wrap: break-word;
   }
   & h2 {
      padding: 20px;
      word-wrap: break-word;
      color: #000000;
   }
   & iframe {
      padding: 20px;
      border-radius: 10px;
   }
`
