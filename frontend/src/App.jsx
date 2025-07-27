
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './Components/Navbar'
import Home from './Pages/Home'
import Login from './Pages/Login'
import Register from './Pages/Register'

function App() {


  return (
    <>
    <BrowserRouter>
      <Navbar/>
    <Routes>
      <Route path='/' element={<Home/>}   />
      <Route path='/l' element={<Login/>}   />
      <Route path='/r' element={<Register/>}/>
    </Routes>

    
    </BrowserRouter>
   
    </>
  )
}

export default App
