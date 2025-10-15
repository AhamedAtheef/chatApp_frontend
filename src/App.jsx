import { Navigate, Route, Routes, } from 'react-router-dom'
import './App.css'
import Navbar from './components/navbar'
import HomePage from './pages/home'
import SignupPage from './pages/signup'
import Login from './pages/login'
import Profile from './pages/profile'
import SettingPage from './pages/setting'
import { useAuthStore } from './store/useAuthStore'
import { useEffect } from 'react'
import Loading from './components/ui/loading'
import { Toaster } from 'react-hot-toast'

export default function App() {
  const { authUser, isCheckingAuth, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);
  console.log("authUser:", authUser);
  if (isCheckingAuth && !authUser)
    return (
      <div
        className="relative min-h-screen bg-[url('/mobile.jpg')] lg:bg-[url('/large.jpg')] bg-cover bg-center bg-no-repeat"
       
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50"></div>

        {/* Content */}
        <div className="relative z-10 flex items-center justify-center min-h-screen">
          <Loading />
        </div>
      </div>

    );

  return (
    <div >
      <Navbar />
      <Routes>
        <Route path='/' element={authUser ? <HomePage /> : <Navigate to="/login" />} />
        <Route path='/signup' element={!authUser ? <SignupPage /> : <Navigate to="/" />} />
        <Route path='/login' element={!authUser ? <Login /> : <Navigate to="/" />} />
        <Route path='/profile' element={authUser ? <Profile /> : <Navigate to="/login" />} />
        <Route path='/settings' element={<SettingPage />} />
      </Routes>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
    </div>
  )
}

