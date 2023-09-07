import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { AddJob, DashboardLayout, Error, HomeLayout, Landing, Login, Register, Stats } from './pages'


const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Landing />
      },
      {
        path: '/register',
        element: <Register />
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: 'dashboard',
        element: <DashboardLayout />,
        children: [
          {
            index: true,
            element: <AddJob />
          },
          {
            path: 'stats',
            element: <Stats />
          }
        ]
      }
    ]
  },

])

function App() {


  return (
    <RouterProvider router={router} />
  )
}

export default App
