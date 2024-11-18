import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import LoginForm from './pages/Login'
import DashboardSucursal from './pages/DashboardSucursal'

const router = createBrowserRouter([
  {
    path: '/',
    element: <LoginForm />,
  },
  {
    path: '/sucursal',
    element: <DashboardSucursal />,
  }
])

function App() {

  return (
    <RouterProvider router={router}>
    </RouterProvider>
  )
}

export default App
