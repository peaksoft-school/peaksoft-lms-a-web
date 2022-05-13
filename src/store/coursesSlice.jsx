import { createSlice } from '@reduxjs/toolkit'

const initState = [
   {
      id: '1',
      image: 'https://i0.wp.com/tiqets-cdn.s3.eu-west-1.amazonaws.com/wordpress/blog/wp-content/uploads/2020/03/22094311/San-Francisco-scaled.jpg?fit=2560%2C1707&ssl=1',
      title: 'React',
      description:
         'Silicon Valley is a global center of technological innovation located in the South San Francisco Bay Area of California',
      date: '20.09.22',
   },
   {
      id: '2',
      image: 'https://www.visittheusa.com/sites/default/files/styles/hero_l/public/images/hero_media_image/2016-10/Getty_591648687_Brand_City_SanFrancisco_Hero_FinalCrop.jpg?itok=UyHVZ5xx',
      title: 'React',
      description:
         'Silicon Valley is a global center of technological innovation located in the South San Francisco Bay Area of California',
      date: '20.09.22',
   },
   {
      id: '3',
      image: 'https://i0.wp.com/tiqets-cdn.s3.eu-west-1.amazonaws.com/wordpress/blog/wp-content/uploads/2020/03/22094311/San-Francisco-scaled.jpg?fit=2560%2C1707&ssl=1',
      title: 'React',
      description:
         'Silicon Valley is a global center of technological innovation located in the South San Francisco Bay Area of California',
      date: '20.09.22',
   },
   {
      id: '4',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/1121098-pink-nature-wallpaper-1920x1080-lockscreen.jpg/1024px-1121098-pink-nature-wallpaper-1920x1080-lockscreen.jpg',
      title: 'React',
      description:
         'Silicon Valley is a global center of technological innovation located in the South San Francisco Bay Area of California',
      date: '20.09.22',
   },
   {
      id: '5',
      image: 'https://c8.alamy.com/comp/FM51Y3/landscape-naturebackground-wallpaper-FM51Y3.jpg',
      title: 'React',
      description:
         'Silicon Valley is a global center of technological innovation located in the South San Francisco Bay Area of California',
      date: '20.09.22',
   },
]
export const coursesSlice = createSlice({
   name: 'courses',
   initialState: initState,
   reducers: {},
})

export const coursesActions = coursesSlice.actions
