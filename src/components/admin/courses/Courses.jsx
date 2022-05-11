import React from 'react'
import { Button } from '../../UI/Button'

export const Courses = () => {
   return (
      <div>
         <div>
            <Button background="#3772FF" bgHover="#1D60FF" bgActive="#6190FF">
               + Создать курс
            </Button>
         </div>
         <div>card</div>
      </div>
   )
}

const options = [
   {
      id: '',
      action: '',
      content: '',
   },
]
