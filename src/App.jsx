import './App.css'
import { ReactComponent as EyeIcon } from './assets/icons/eyeIcon.svg'
import { ReactComponent as EditIcon } from './assets/icons/editIcon.svg'
import { ReactComponent as RemoveIcon } from './assets/icons/removeIcon.svg'
import { AppTable } from './components/UI/Table'

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
      title: 'Пароль',
      accessKey: 'password',
   },
   {
      title: 'Действия',
      accessKey: 'action',
   },
]
const DATA = [
   {
      id: 1,
      name: 'John Smith',
      group: 'JS-4',
      study_format: 'Онлайн',
      mobile_phone: '0222232312',
      email: 'user@gmail.com',
      password: 'hjdj4343',
      action: (
         <span>
            <EyeIcon onClick={() => alert('hello')} />
            <EditIcon />
            <RemoveIcon />
         </span>
      ),
   },
   {
      id: 2,
      name: 'John Smith',
      group: 'JS-4',
      study_format: 'Онлайн',
      mobile_phone: '0222232312',
      email: 'user@gmail.com',
      password: 'hjdj4343',
      action: (
         <span>
            <EyeIcon />
            <EditIcon />
            <RemoveIcon />
         </span>
      ),
   },
   {
      id: 3,
      name: 'John Smith',
      group: 'JS-4',
      study_format: 'Онлайн',
      mobile_phone: '0222232312',
      email: 'user@gmail.com',
      password: 'hjdj4343',
      action: (
         <span>
            <EyeIcon />
            <EditIcon />
            <RemoveIcon />
         </span>
      ),
   },
]

const COLUMNS2 = [
   {
      title: 'ID',
      accessKey: 'id',
   },
   {
      title: 'First Name',
      accessKey: 'firstName',
   },
   {
      title: 'Last Name',
      accessKey: 'lastName',
   },
   {
      title: 'City',
      accessKey: 'city',
   },
]

const DATA2 = [
   {
      id: 1,
      firstName: 'John',
      lastName: 'Smith',
      city: 'Bishkek',
   },
   {
      id: 2,
      firstName: 'John',
      lastName: 'Smith',
      city: 'Bishkek',
   },
   {
      id: 3,
      firstName: 'John',
      lastName: 'Smith',
      city: 'Bishkek',
   },
]

function App() {
   return (
      <div className="App">
         <AppTable columns={COLUMNS} data={DATA} />
         <AppTable columns={COLUMNS2} data={DATA2} />
      </div>
   )
}

export default App
