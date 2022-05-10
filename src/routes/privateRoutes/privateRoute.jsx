import React from 'react'
import { Navigate } from 'react-router-dom'

export const PrivateRoute = ({ Component, isAuthorized }) => {
   if (!isAuthorized) return <Navigate to="/login" />
   return Component
}
