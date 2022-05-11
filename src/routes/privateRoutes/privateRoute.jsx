import React from 'react'
import { Navigate } from 'react-router-dom'

export const PrivateRoute = ({ Component, isAuthorized, role }) => {
   if (!isAuthorized) return <Navigate to="/login" />
   if (isAuthorized && !role) return <Navigate to="/login" />
   return Component
}
