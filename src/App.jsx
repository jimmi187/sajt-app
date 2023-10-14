import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Navbar from './Navbar'
import "./css/nav.css"
import "./css/blog.css"
import "./css/igrice.css"
import Portfolio from './pages/Portfolio'
import Blog from './pages/Blog'
import Hakovi from './pages/Hakovi'
import Klopa from './pages/Klopa'
import StartPage from './pages/StartPage'
import Igrice from './pages/Igrice'
import Diy from './pages/Diy'
import Nesto from "./elem/Nesto";

function App() {

  return (
    <>
      <Navbar />
      <div className='container'>
        <Routes>
          <Route path="/" element={<StartPage />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:postId" element={<Nesto />} />
          <Route path="/hakovi" element={<Hakovi />} />
          <Route path="/klopa" element={<Klopa />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/igrice" element={<Igrice />} />
          <Route path="/diy" element={<Diy />} />
        </Routes>
      </div>
    </>
  )
}

export default App
