import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Navbar() {
  const { isAuthenticated, logout, user } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <header className="border-b border-slate-200 bg-white/90">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <NavLink to="/stories" className="flex items-center gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-700">
              SMS Express
            </p>
            <h1 className="text-xl font-bold text-slate-950">Story Studio</h1>
          </div>
        </NavLink>

        <div className="flex items-center gap-3">
          {isAuthenticated ? (
            <>
              <nav className="flex rounded-md border border-slate-200 bg-slate-50 p-1">
                {[
                  { to: '/stories', label: 'Stories' },
                  { to: '/add', label: 'Add Story' },
                ].map(({ to, label }) => (
                  <NavLink
                    key={to}
                    to={to}
                    className={({ isActive }) =>
                      [
                        'rounded-md px-4 py-2 text-sm font-semibold transition',
                        isActive
                          ? 'bg-slate-950 text-white'
                          : 'text-slate-600 hover:bg-white hover:text-slate-950',
                      ].join(' ')
                    }
                  >
                    {label}
                  </NavLink>
                ))}
              </nav>
              <span className="text-sm text-slate-600">
                Welcome back,{' '}
                <span className="font-semibold text-slate-950">{user?.email}</span>
              </span>
              <button
                type="button"
                onClick={handleLogout}
                className="rounded-md border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-950 hover:text-slate-950"
              >
                Logout
              </button>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  [
                    'rounded-md px-4 py-2 text-sm font-semibold transition',
                    isActive
                      ? 'bg-slate-950 text-white'
                      : 'text-slate-600 hover:bg-white hover:text-slate-950',
                  ].join(' ')
                }
              >
                Login
              </NavLink>
              <NavLink
                to="/register"
                className={({ isActive }) =>
                  [
                    'rounded-md px-4 py-2 text-sm font-semibold transition',
                    isActive
                      ? 'bg-teal-700 text-white'
                      : 'bg-teal-700 text-white hover:bg-teal-800',
                  ].join(' ')
                }
              >
                Register
              </NavLink>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

export default Navbar
