import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { Link, useNavigate } from 'react-router-dom'
import { loginUser } from '../services/authService'
import { useAuth } from '../context/AuthContext'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()

  const loginMutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      if (!data?.accessToken) {
        setError('Login failed. The server did not return an access token.')
        return
      }
      login(data.accessToken)
      navigate('/stories')
    },
    onError: (err) => {
      const status = err?.response?.status
      if (status === 429) {
        setError('Too many login attempts. Please wait a few minutes and try again.')
      } else if (status === 401) {
        setError('Invalid email or password.')
      } else {
        setError(err?.response?.data?.message || err?.message || 'Something went wrong. Please try again.')
      }
    },
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    loginMutation.mutate({ email, password })
  }

  return (
    <div className="mx-auto max-w-sm">
      <p className="mb-1 text-sm font-semibold uppercase tracking-[0.2em] text-teal-700">
        Account
      </p>
      <h2 className="mb-6 text-3xl font-bold text-slate-950">Login</h2>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 rounded-lg border border-slate-200 bg-white p-6 shadow-sm"
      >
        <label className="grid gap-2">
          <span className="text-sm font-semibold text-slate-700">Email</span>
          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="rounded-md border border-slate-300 bg-white px-4 py-3 text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-teal-600 focus:ring-4 focus:ring-teal-100"
          />
        </label>

        <label className="grid gap-2">
          <span className="text-sm font-semibold text-slate-700">Password</span>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="rounded-md border border-slate-300 bg-white px-4 py-3 text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-teal-600 focus:ring-4 focus:ring-teal-100"
          />
        </label>

        {error && (
          <p className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loginMutation.isPending}
          className="mt-2 rounded-md bg-teal-700 px-5 py-3 text-sm font-bold text-white transition hover:bg-teal-800 disabled:cursor-not-allowed disabled:bg-slate-400"
        >
          {loginMutation.isPending ? 'Logging In...' : 'Login'}
        </button>

        <p className="text-center text-sm text-slate-600">
          Don&apos;t have an account?{' '}
          <Link to="/register" className="font-semibold text-teal-700 hover:underline">
            Register
          </Link>
        </p>
      </form>
    </div>
  )
}

export default Login
