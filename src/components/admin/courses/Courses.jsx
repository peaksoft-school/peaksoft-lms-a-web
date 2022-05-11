import React from 'react'
import { Button } from '../../UI/Button'
import { Card } from '../../UI/Card'

export const Courses = () => {
   return (
      <div>
         <div>
            <Button background="#3772FF" bgHover="#1D60FF" bgActive="#6190FF">
               + Создать курс
            </Button>
         </div>
         <div>
            <Card options={options} />
         </div>
      </div>
   )
}

const options = [
   {
      id: '1',
      action: () => alert('hi'),
      content: (
         <>
            <p>icon</p>
            <p>edit</p>
         </>
      ),
   },
]
