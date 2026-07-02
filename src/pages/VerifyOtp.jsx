import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { useLocation, useNavigate } from 'react-router-dom'
import { verifyOtp } from '../services/authService'

function VerifyOtp() {
  const [otp, setOtp] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const navigate = useNavigate()
  const location = useLocation()

  // email and userId passed from Register page via navigate state
  const { email, userId } = location.state || {}

  // If user lands here directly without going through Register, redirect them
  if (!email) {
    navigate('/register', { replace: true })
    return null
  }

  const verifyMutation = useMutation({
    mutationFn: verifyOtp,
    onSuccess: () => {
      setSuccess('Email verified! You can now log in.')
      setTimeout(() => navigate('/login'), 2000)
    },
    onError: (err) => {
      const status = err?.response?.status
      if (status === 429) {
        setError('Too many attempts. Please wait a few minutes and try again.')
      } else {
        setError(err?.response?.data?.error || err?.message || 'Invalid or expired OTP.')
      }
    },
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    verifyMutation.mutate({ email, otp })
  }

  return (
    <div className="mx-auto max-w-sm">
      <p className="mb-1 text-sm font-semibold uppercase tracking-[0.2em] text-teal-700">
        Verification
      </p>
      <h2 className="mb-2 text-3xl font-bold text-slate-950">Enter OTP</h2>
      <p className="mb-6 text-sm text-slate-600">
        A verification code was sent to{' '}
        <span className="font-semibold text-slate-950">{email}</span>. Enter it below.
      </p>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 rounded-lg border border-slate-200 bg-white p-6 shadow-sm"
      >
        <label className="grid gap-2">
          <span className="text-sm font-semibold text-slate-700">OTP Code</span>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
            maxLength={6}
            className="rounded-md border border-slate-300 bg-white px-4 py-3 text-center text-2xl font-bold tracking-[0.5em] text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-teal-600 focus:ring-4 focus:ring-teal-100"
          />
        </label>

        {error && (
          <p className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
            {error}
          </p>
        )}

        {success && (
          <p className="rounded-md border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
            {success}
          </p>
        )}

        <button
          type="submit"
          disabled={verifyMutation.isPending}
          className="mt-2 rounded-md bg-teal-700 px-5 py-3 text-sm font-bold text-white transition hover:bg-teal-800 disabled:cursor-not-allowed disabled:bg-slate-400"
        >
          {verifyMutation.isPending ? 'Verifying...' : 'Verify OTP'}
        </button>
      </form>
    </div>
  )
}

export default VerifyOtp
