import React, { useEffect } from 'react'
import styled from '@emotion/styled'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import ReactPlayer from 'react-player'
import { getSingleVideo } from '../../../../../store/INSTRUCTOR/video-slice'
import { Spinner } from '../../../../UI/Spinner/Spinner'
import { BreadCrumbs } from '../../../../UI/breadCrumb/BreadCrumbs'
import { getCourse } from '../../../../../store/INSTRUCTOR/materials-slice'

const VideoInnerPage = () => {
   const dispatch = useDispatch()
   const { isLoading } = useSelector((state) => state.video)
   const { course } = useSelector((state) => state.materials)
   const { singleVideo } = useSelector((state) => state.video)
   const { videoId, id } = useParams()

   useEffect(() => {
      if (videoId) {
         dispatch(getSingleVideo(videoId))
      }
      dispatch(getCourse(id))
   }, [])

   const pathsArray = [
      {
         path: '/instructor/instructor_course',
         name: 'курсы',
      },
      {
         path: `/instructor/instructor_course/${id}/materials`,
         name: course?.courseName,
      },
      {
         path: '/instructors',
         name: 'Материалы',
      },
   ]
   return (
      <Container>
         <BreadCrumbs pathsArray={pathsArray} />
         {(isLoading && <Spinner />) || (
            <VideoPresentationContainer>
               <div>
                  <h2>{singleVideo?.videoName}</h2>
               </div>
               <div>
                  <p>{singleVideo?.description}</p>
               </div>

               <div>
                  <ReactPlayer
                     width="792px"
                     height="464px"
                     border-radius="10px"
                     muted
                     controls
                     url={singleVideo?.videoLink}
                  />
               </div>
            </VideoPresentationContainer>
         )}
      </Container>
   )
}

export default VideoInnerPage
const Container = styled.div`
   margin-top: 20px;
`
const VideoPresentationContainer = styled.div`
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
   & iframe {
      padding: 20px;
      border-radius: 10px;
   }
`
