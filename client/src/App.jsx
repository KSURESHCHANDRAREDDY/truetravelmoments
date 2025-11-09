import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from './app/hooks'
import { fetchMe } from './features/auth/authSlice'
import Navbar from './components/Navbar'
import AddStory from './pages/AddStory'
import Home from './pages/Home'
import Explore from './pages/Explore'
import About from './pages/About'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Footer from './components/Footer'

function InnerApp() {
  const dispatch = useAppDispatch()
  const user = useAppSelector((state) => state.auth.user)
  const location = useLocation()
  useEffect(() => {
    const path = location.pathname
    const isAuthPage = path === '/login' || path === '/signup'
    if (!user && !isAuthPage) {
      dispatch(fetchMe())
    }
  }, [dispatch, user, location.pathname])
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/add-story" element={<AddStory />} />
      </Routes>
    </>
  )
}

export default function App() {
  return (
    <Router>
      <InnerApp />
    </Router>
  )
}
