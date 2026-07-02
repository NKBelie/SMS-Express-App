import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getStoryById } from '../services/StoryService'

function StoryDetails() {
  const { id } = useParams()
  const [story, setStory] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let isMounted = true

    const fetchStory = async () => {
      try {
        const data = await getStoryById(id)
        if (isMounted) setStory(data)
      } catch (err) {
        if (isMounted) setError(err.message || 'Could not load the story.')
      } finally {
        if (isMounted) setLoading(false)
      }
    }

    fetchStory()
    return () => { isMounted = false }
  }, [id])

  if (loading) {
    return (
      <div className="rounded-lg border border-slate-200 bg-white p-8 text-center shadow-sm">
        <p className="font-semibold text-slate-700">Loading story...</p>
      </div>
    )
  }

  if (error) {
    return (
      <section className="rounded-lg border border-red-200 bg-red-50 p-6">
        <p className="font-semibold text-red-700">{error}</p>
        <Link
          to="/stories"
          className="mt-5 inline-flex items-center justify-center rounded-md bg-slate-950 px-5 py-3 text-sm font-bold text-white transition hover:bg-slate-800"
        >
          Back to Stories
        </Link>
      </section>
    )
  }

  return (
    <article className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-teal-700">Story</p>
          <h2 className="mt-2 text-3xl font-bold text-slate-950">{story.authorName}</h2>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link
            to="/stories"
            className="rounded-md border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-950 hover:text-slate-950"
          >
            Back
          </Link>
          <Link
            to={`/edit/${id}`}
            className="rounded-md bg-amber-400 px-4 py-2 text-sm font-bold text-slate-950 transition hover:bg-amber-300"
          >
            Edit
          </Link>
        </div>
      </div>
      <p className="whitespace-pre-wrap text-base leading-8 text-slate-700">{story.content}</p>
    </article>
  )
}

export default StoryDetails
