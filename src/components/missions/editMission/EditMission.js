import React from 'react'
import { useLocation } from 'react-router'


export const EditMission = () => {
  const location = useLocation()
  const id = location.pathname.split('/')[2]

  console.log('idMission', id)

  return (
    <h1>EditMission {id}</h1>
  )
}
