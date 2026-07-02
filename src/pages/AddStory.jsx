import { useState } from 'react'
import { Link } from 'react-router-dom'
import { createStory } from '../services/StoryService'

function AddStory() {
  const [authorName, setAuthorName] = useState('')
  const [content, setContent] = useState('')
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()
    setStatus('saving')
    setError('')

    try {
      await createStory({ authorName: authorName.trim(), content: content.trim() })
      setAuthorName('')
      setContent('')
      setStatus('saved')
    } catch (err) {
      setError(err.message || 'Could not save the story.')
      setStatus('idle')
    }
  }

  const isSaving = status === 'saving'

  return (
    <section>
      <form
        onSubmit={handleSubmit}
        className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
      >
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-teal-700">
              New Story
            </p>
            <h2 className="mt-2 text-3xl font-bold text-slate-950">Add a Story</h2>
          </div>
          <Link
            to="/stories"
            className="inline-flex items-center justify-center rounded-md border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-950 hover:text-slate-950"
          >
            View Stories
          </Link>
        </div>

        <div className="grid gap-5">
          <label className="grid gap-2">
            <span className="text-sm font-semibold text-slate-700">Author Name</span>
            <input
              value={authorName}
              onChange={(event) => setAuthorName(event.target.value)}
              placeholder="Enter author name"
              required
              className="rounded-md border border-slate-300 bg-white px-4 py-3 text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-teal-600 focus:ring-4 focus:ring-teal-100"
            />
          </label>

          <label className="grid gap-2">
            <span className="text-sm font-semibold text-slate-700">Story Content</span>
            <textarea
              value={content}
              onChange={(event) => setContent(event.target.value)}
              placeholder="Write the story here"
              required
              rows={9}
              className="resize-y rounded-md border border-slate-300 bg-white px-4 py-3 text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-teal-600 focus:ring-4 focus:ring-teal-100"
            />
          </label>
        </div>

        {error && (
          <p className="mt-5 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
            {error}
          </p>
        )}

        {status === 'saved' && (
          <p className="mt-5 rounded-md border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
            Story saved.
          </p>
        )}

        <div className="mt-8 flex justify-end">
          <button
            type="submit"
            disabled={isSaving}
            className="inline-flex min-w-32 items-center justify-center rounded-md bg-teal-700 px-5 py-3 text-sm font-bold text-white transition hover:bg-teal-800 disabled:cursor-not-allowed disabled:bg-slate-400"
          >
            {isSaving ? 'Saving...' : 'Save Story'}
          </button>
        </div>
      </form>
    </section>
  )
}

export default AddStory
