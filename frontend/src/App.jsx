import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route,Routes,BrowserRouter } from 'react-router-dom'
import Main from './Components/Main'
import Navbar from './Components/Navbar'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>

    <BrowserRouter>
    <Navbar/>

    <Routes>

    <Route path='/' element={<Main/>}></Route>
    </Routes>

    
    
    </BrowserRouter>
   
    </>
  )
}

export default App
