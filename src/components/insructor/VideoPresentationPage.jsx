import React, { useEffect } from 'react'
import styled from '@emotion/styled'
import { useParams } from 'react-router-dom'

import { useDispatch } from 'react-redux'
// import { Spinner } from '../UI/Spinner/Spinner'
import ReactPlayer from 'react-player'

export const VideoPresentationPage = (props) => {
   const dispatch = useDispatch()
   const { id } = useParams()

   // useEffect(() => {
   //    dispatch(getSingleVideo(id))
   // })

   return (
      <div>
         {/* {(isLoading && <Spinner />) || ( */}
         <VideoPresentationContainer>
            <div>
               {/* <h1>{props.title}</h1> */}
               <h2>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Incidunt ratione earum obcaecati esse? Autem, eos omnis.
                  Incidunt, dolores iusto! Necessitatibus quos in asperiores sed
                  ipsa eveniet eos natus assumenda cupiditate.
               </h2>
            </div>
            <div>
               {/* <p>{props.VideoPresentationDescription}</p> */}
               <p>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Atque, quidem temporibus possimus libero commodi tenetur sit
                  placeat aspernatur quam ratione totam fuga aliquid quos,
                  facere sint porro soluta distinctio? Vero. Lorem ipsum, dolor
                  sit amet consectetur adipisicing elit. Atque, quidem
                  temporibus possimus libero commodi tenetur sit placeat
                  aspernatur quam ratione totam fuga aliquid quos, facere sint
                  porro soluta distinctio? Vero. Lorem ipsum, dolor sit amet
                  consectetur adipisicing elit. Atque, quidem temporibus
                  possimus libero commodi tenetur sit placeat aspernatur quam
                  ratione totam fuga aliquid quos, facere sint porro soluta
                  distinctio? Vero.
               </p>
            </div>

            <div>
               {/* <iframe
                  width="792"
                  height="464"
                  src="https://www.youtube.com/embed/C-AFpwNrPRU"
                  title="YouTube video player"
                  allow="accelerometer; autoplay; 
                  clipboard-write; encrypted-media; gyroscope; picture-in-picture"

                  allowFullScreen
               /> */}
               <ReactPlayer
                  width="792px"
                  height="464px"
                  border-radius="10px"
                  muted
                  playing
                  controls
                  url="https://www.youtube.com/embed/C-AFpwNrPRU"
               />
            </div>
         </VideoPresentationContainer>
         {/* )} */}
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
   }
   & h2 {
      padding: 20px;
      color: #000000;
   }
   & iframe {
      padding: 20px;
      border-radius: 10px;
   }
`
