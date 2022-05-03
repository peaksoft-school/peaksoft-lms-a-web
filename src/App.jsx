import './App.css'
// import styled from '@emotion/styled'
import { useState } from 'react'
import { ReactComponent as EyeIcon } from './assets/icons/eyeIcon.svg'
import { ReactComponent as EditIcon } from './assets/icons/editIcon.svg'
import { ReactComponent as RemoveIcon } from './assets/icons/removeIcon.svg'
import { AppTable } from './components/UI/Table'

function App() {
   const [studentsData, setStudentsData] = useState(DATA)
   const COLUMNS = [
      {
         title: 'ID',
         accessKey: 'id',
      },
      {
         title: 'Имя Фамилия',
         accessKey: 'name',
      },
      {
         title: 'Группа',
         accessKey: 'group',
      },
      {
         title: 'Формат обучения',
         accessKey: 'study_format',
      },
      {
         title: 'Номер телефона',
         accessKey: 'mobile_phone',
      },
      {
         title: 'E-mail',
         accessKey: 'email',
      },
      {
         title: 'Действия',

         accessKey: {
            action: (
               <>
                  {studentsData.map((item) => {
                     return (
                        <span key={item.id}>
                           <EyeIcon />
                           <EditIcon />
                           <RemoveIcon
                              onClick={(e) => onRemoveRow(e, item.id)}
                           />
                        </span>
                     )
                  })}
               </>
            ),
         },
      },
   ]
   const onRemoveRow = (e, id) => {
      const fillteredData = studentsData.filter((item) => {
         return item.id !== id
      })
      console.log(id)
      setStudentsData(fillteredData)
   }
   console.log(studentsData)
   return (
      <div className="App">
         <AppTable columns={COLUMNS} data={studentsData} />
         {/* <AppTable columns={COLUMNS2} data={DATA2} /> */}
      </div>
   )
}

export default App

let DATA = [
   {
      id: 1,
      name: 'John Smith',
      group: 'JS-4',
      study_format: 'Онлайн',
      mobile_phone: '0222232312',
      email: 'user@gmail.com',
      password: 'hjdj4343',
   },
   {
      id: 2,
      name: 'John Smith',
      group: 'JS-4',
      study_format: 'Онлайн',
      mobile_phone: '0222232312',
      email: 'user@gmail.com',
      password: 'hjdj4343',
   },
   {
      id: 3,
      name: 'John Smith',
      group: 'JS-4',
      study_format: 'Онлайн',
      mobile_phone: '0222232312',
      email: 'user@gmail.com',
      password: 'hjdj4343',
   },
   {
      id: 4,
      name: 'John Smith',
      group: 'JS-4',
      study_format: 'Онлайн',
      mobile_phone: '0222232312',
      email: 'user@gmail.com',
      password: 'hjdj4343',
   },
]
