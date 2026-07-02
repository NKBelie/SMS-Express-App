import { Navigate, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import ProtectedRoute from './components/ProtectedRoute'
import AddStory from './pages/AddStory.jsx'
import EditStory from './pages/EditStory.jsx'
import Login from './pages/Login.jsx'
import StoryDetails from './pages/StoryDetails.jsx'
import StoryList from './pages/StoryList.jsx'

function App() {
  return (
    <div className="min-h-screen bg-[#f7f7f2] text-slate-950">
      <Navbar />
      <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/stories" element={<ProtectedRoute><StoryList /></ProtectedRoute>} />
          <Route path="/story/:id" element={<ProtectedRoute><StoryDetails /></ProtectedRoute>} />
          <Route path="/add" element={<ProtectedRoute><AddStory /></ProtectedRoute>} />
          <Route path="/edit/:id" element={<ProtectedRoute><EditStory /></ProtectedRoute>} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
