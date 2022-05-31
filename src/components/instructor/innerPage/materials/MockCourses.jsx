import styled from '@emotion/styled'

const DUMMY_DATA = [
   {
      title: 'Baiaaly',
      id: 1,
   },
   {
      title: 'Abaskanov',
      id: 2,
   },
]

export const Mockcourses = () => {
   return (
      <>
         {DUMMY_DATA.map((el) => (
            <MockCard key={el.id}>{el.title}</MockCard>
         ))}
      </>
   )
}

const MockCard = styled.div`
   width: 400px;
   height: 300px;
   background: red;
   border-radius: 15px;
   margin: 20px;
   display: flex;
   align-items: center;
   justify-content: center;
   font-size: 40px;
   cursor: pointer;
`
