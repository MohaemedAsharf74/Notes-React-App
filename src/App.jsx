import React from 'react'
import { RouterProvider, createHashRouter } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import Home from './components/Home/Home'
import Login from './components/Login/Login'
import Register from './components/Register/Register'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import NotFound from './components/NotFound/NotFound'
import Search from './components/Search/Search'
import NoteContextProvider from './Context/NoteContext'

export default function App() {
  let routes = createHashRouter([
    {
      path: "/", element: <ProtectedRoute><Layout /></ProtectedRoute>, children: [
        { index: true, element: <ProtectedRoute><Home /></ProtectedRoute> },
        { path: "*", element: <ProtectedRoute><NotFound /></ProtectedRoute> },
        { path: "/search", element: <ProtectedRoute><Search /></ProtectedRoute> }
      ]
    },
    { path: '/Login', element: <Login /> },
    { path: '/Register', element: <Register /> }
  ])

  return <>
    <NoteContextProvider>
      <RouterProvider router={routes}>
      </RouterProvider>
    </NoteContextProvider>

  </>
}
