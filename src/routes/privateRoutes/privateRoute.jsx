import React from 'react'
import { Navigate } from 'react-router-dom'

export const PrivateRoute = ({ Component, role }) => {
   if (!role) return <Navigate to="/login" />
   return Component
}
