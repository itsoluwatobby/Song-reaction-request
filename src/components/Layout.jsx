import React from 'react'
import { Outlet } from 'react-router-dom'
import { Top } from './Top'

export const Layout = () => {
  return (
    <main className='w-full min-h-screen flex flex-col'>
      <Top />
      <Outlet />
    </main>
  )
}
