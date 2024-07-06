import { useState } from 'react'
import './App.css'
import Dashboard from './pages/Dashbord'
import Login from './pages/Login'
import Register from './pages/Register'
import MainLayout from './layout/MainLayout'
import { createBrowserRouter,RouterProvider, createRoutesFromElements, Route } from 'react-router-dom'


function App() {


  const Router = createBrowserRouter(
    createRoutesFromElements(
      <Route element={<MainLayout />} >
        <Route path="/" element={<Dashboard />} />,
        <Route path="/login" element={<Login />} />,
        <Route path="/register" element={<Register />} />
      </Route>,
    )
  )
  

  return (
    <>
      <RouterProvider router={Router}>
      
      </RouterProvider>
    </>
  )
}

export default App
