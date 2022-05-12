import styled from '@emotion/styled'
import React, { useState } from 'react'
import { Button } from '../../UI/Button'
import { Card } from '../../UI/Card'
import { ReactComponent as PinIcon } from '../../../assets/icons/pinnedIcon.svg'
import { ReactComponent as EditIcon } from '../../../assets/icons/edit.svg'
import { ReactComponent as TrashIcon } from '../../../assets/icons/trashIcon.svg'
import { BasicModal } from '../../UI/BasicModal'
import { ImagePicker } from '../../UI/ImagePicker'
import { Input } from '../../UI/Input'

export const Courses = () => {
   const [isModalOpen, setIsModalOpen] = useState(false)
   const openModalHandler = () => {
      setIsModalOpen(true)
   }
   return (
      <div>
         <StyledButton>
            <span>
               <Button
                  onClick={openModalHandler}
                  background="#3772FF"
                  bgHover="#1D60FF"
                  bgActive="#6190FF"
               >
                  + Создать курс
               </Button>
            </span>
         </StyledButton>
         {isModalOpen && (
            <BasicModal isModalOpen={isModalOpen} title="Создать курс">
               <ImagePicker />
               <Input />
               <Button>Отмена</Button>
               <Button>Добавить</Button>
            </BasicModal>
         )}

         <Container>
            {cards.map((card) => (
               <StyledCard key={card.id}>
                  <Card
                     options={options}
                     image={card.image}
                     title={card.title}
                     description={card.description}
                     date={card.date}
                  />
               </StyledCard>
            ))}
         </Container>
      </div>
   )
}
const StyledIcon = styled.div`
   display: flex;
   & p {
      margin-left: 8px;
   }
`
const StyledButton = styled.div`
   display: flex;
   align-items: center;
   justify-content: flex-end;
   height: 80px;
`
const StyledCard = styled.div`
   width: 270px;
`
const Container = styled.div`
   display: flex;
   flex-wrap: wrap;
   justify-content: space-between;
`
const options = [
   {
      id: '1',
      action: () => alert('hi'),
      content: (
         <StyledIcon>
            <PinIcon />
            <p>Назначить учителя</p>
         </StyledIcon>
      ),
   },
   {
      id: '2',
      action: () => alert('hi'),
      content: (
         <StyledIcon>
            <EditIcon />
            <p>Редактировать</p>
         </StyledIcon>
      ),
   },
   {
      id: '3',
      action: () => alert('hi'),
      content: (
         <StyledIcon>
            <TrashIcon />
            <p>Удалить</p>
         </StyledIcon>
      ),
   },
]

const cards = [
   {
      id: '1',
      image: 'https://akcdn.detik.net.id/community/media/visual/2022/03/15/silicon-valley-1_43.jpeg?w=480',
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
