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
import Games from './pages/Games'
import Diy from './pages/Diy'
import Nesto from "./elems/Nesto";
import Backpocket from './pages/Backpocket'
import FileOpened from './elems/FileOpened'

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
          <Route path="/games" element={<Games />} />
          <Route path="/diy" element={<Diy />} />
          <Route path="/backpocket" element={< Backpocket/>} >
            <Route path=":postId"element={<FileOpened/>}></Route>
          </Route>
        </Routes>
      </div>
    </>
  )
}

export default App
