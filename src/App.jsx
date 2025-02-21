import { Outlet } from 'react-router'
import Navbar from './components/Navbar'

function App() {

  return (
    <div className='font-inter mx-[10%] mt-6 min-h-screen'>
      <Navbar></Navbar>
      <Outlet></Outlet>
    </div>
  )
}

export default App
