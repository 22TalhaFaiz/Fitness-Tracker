
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './Components/Navbar'
import Home from './Pages/Home'
import Login from './Pages/Login'
import Register from './Pages/Register'
import Footer from './Components/Footer'
import Layout from './Components/Layout'

function App() {


  return (
    <>
      <BrowserRouter>

        <Routes>
          <Route path="/" element={<Layout><Home /></Layout>} />
          <Route path="/l" element={<Layout><Login /></Layout>} />
          <Route path="/r" element={<Layout><Register /></Layout>} />
        </Routes>


      </BrowserRouter>

    </>
  )
}

export default App
