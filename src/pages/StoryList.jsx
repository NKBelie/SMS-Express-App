import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { deleteStory, getStories } from '../services/StoryService'

const getStoryId = (story) => story.id ?? story._id

function StoryList() {
  const [stories, setStories] = useState([])
  const [loading, setLoading] = useState(true)
  const [deletingId, setDeletingId] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    let isMounted = true

    const loadStories = async () => {
      try {
        const data = await getStories()
        if (isMounted) setStories(Array.isArray(data) ? data : [])
      } catch (err) {
        if (isMounted) setError(err.message || 'Could not load stories.')
      } finally {
        if (isMounted) setLoading(false)
      }
    }

    loadStories()
    return () => { isMounted = false }
  }, [])

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this story?')) return

    setDeletingId(id)
    setError('')

    try {
      await deleteStory(id)
      setStories((prev) => prev.filter((story) => getStoryId(story) !== id))
    } catch (err) {
      setError(err.message || 'Could not delete the story.')
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <section>
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-teal-700">
            Library
          </p>
          <h2 className="mt-2 text-3xl font-bold text-slate-950">Stories</h2>
        </div>
        <Link
          to="/add"
          className="inline-flex items-center justify-center rounded-md bg-teal-700 px-5 py-3 text-sm font-bold text-white transition hover:bg-teal-800"
        >
          Add Story
        </Link>
      </div>

      {error && (
        <p className="mb-6 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          {error}
        </p>
      )}

      {loading ? (
        <div className="rounded-lg border border-slate-200 bg-white p-8 text-center shadow-sm">
          <p className="font-semibold text-slate-700">Loading stories...</p>
        </div>
      ) : stories.length === 0 ? (
        <div className="rounded-lg border border-dashed border-slate-300 bg-white p-8 text-center">
          <h3 className="text-xl font-bold text-slate-950">No stories yet</h3>
          <Link
            to="/add"
            className="mt-5 inline-flex items-center justify-center rounded-md bg-slate-950 px-5 py-3 text-sm font-bold text-white transition hover:bg-slate-800"
          >
            Add First Story
          </Link>
        </div>
      ) : (
        <div className="grid gap-4">
          {stories.map((story) => {
            const id = getStoryId(story)
            const isDeleting = deletingId === id

            return (
              <article
                key={id}
                className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition hover:border-teal-200 hover:shadow-md"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-slate-950">{story.authorName}</h3>
                    <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">
                      {story.content}
                    </p>
                  </div>
                  <div className="flex shrink-0 flex-wrap gap-2">
                    <Link
                      to={`/story/${id}`}
                      className="rounded-md border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-950 hover:text-slate-950"
                    >
                      View
                    </Link>
                    <Link
                      to={`/edit/${id}`}
                      className="rounded-md border border-amber-300 bg-amber-50 px-3 py-2 text-sm font-semibold text-amber-800 transition hover:bg-amber-100"
                    >
                      Edit
                    </Link>
                    <button
                      type="button"
                      onClick={() => handleDelete(id)}
                      disabled={isDeleting}
                      className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm font-semibold text-red-700 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {isDeleting ? 'Deleting...' : 'Delete'}
                    </button>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      )}
    </section>
  )
}

export default StoryList
