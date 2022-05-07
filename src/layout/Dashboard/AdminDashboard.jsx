import React from 'react'
import { Dashboard } from '../Dashboard'

import { DATA } from '../../utils/constants/general'

export const AdminDashboard = () => {
   return (
      <div>
         <Dashboard data={DATA} />
      </div>
   )
}
