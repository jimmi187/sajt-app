import { Route, Routes } from 'react-router-dom'
import Navbar from './Navbar'
import "./css/nav.css"
import "./css/blog.css"
import "./css/igrice.css"
import "./css/recepies.css"
import Portfolio from './pages/Portfolio'
import Blog from './pages/Blog'
import Recipes from './pages/Recipes'
import StartPage from './pages/StartPage'
import Games from './pages/Games'
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
          <Route path="/recipes" element={<Recipes />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/games" element={<Games />} />
          <Route path="/backpocket" element={< Backpocket/>} >
            <Route path=":postId"element={<FileOpened/>}></Route>
          </Route>
        </Routes>
      </div>
    </>
  )
}

export default App
