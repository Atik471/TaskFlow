import { Outlet } from 'react-router'

function App() {

  return (
    <div className='font-inter mx-[10%] mt-6 min-h-screen'>
      <h1 className='text-2xl'>TaskFlow</h1>
      <Outlet></Outlet>
    </div>
  )
}

export default App
