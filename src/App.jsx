import { NavLink, Navigate, Route, Routes } from 'react-router-dom'
import AddStory from './pages/AddStory.jsx'
import EditStory from './pages/EditStory.jsx'
import StoryDetails from './pages/StoryDetails.jsx'
import StoryList from './pages/StoryList.jsx'

const navItems = [
  { to: '/', label: 'Add Story', end: true },
  { to: '/stories', label: 'Stories' },
]

function App() {
  return (
    <div className="min-h-screen bg-[#f7f7f2] text-slate-950">
      <header className="border-b border-slate-200 bg-white/90">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <NavLink to="/" className="flex items-center gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-700">
                SMS Express
              </p>
              <h1 className="text-xl font-bold text-slate-950">Story Studio</h1>
            </div>
          </NavLink>
          <nav className="flex rounded-md border border-slate-200 bg-slate-50 p-1">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  [
                    'rounded-md px-4 py-2 text-sm font-semibold transition',
                    isActive
                      ? 'bg-slate-950 text-white'
                      : 'text-slate-600 hover:bg-white hover:text-slate-950',
                  ].join(' ')
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <Routes>
          <Route path="/" element={<AddStory />} />
          <Route path="/stories" element={<StoryList />} />
          <Route path="/stories/:id" element={<StoryDetails />} />
          <Route path="/stories/:id/edit" element={<EditStory />} />
          <Route path="/storyList" element={<Navigate to="/stories" replace />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
