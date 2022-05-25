import { LessonCard } from './components/UI/lessonCard/LessonCard'
import { Notification } from './components/UI/notification/Notification'
import { AppRoutes } from './routes/AppRoutes'

function App() {
   const video = {
      name: 'a',
   }
   return (
      <>
         {/* <AppRoutes /> */}
         <LessonCard video={video} title="Test" />
         <Notification />
      </>
   )
}

export default App
