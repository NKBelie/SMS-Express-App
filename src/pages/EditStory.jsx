import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import heroImage from '../assets/hero.png'
import { getStoryById, updateStory } from '../services/StoryService'

function EditStory() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [authorName, setAuthorName] = useState('')
    const [content, setContent] = useState('')
    // const [imageUrl, setImageUrl] = useState('')
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [error, setError] = useState('')

    useEffect(() => {
        let isMounted = true

        const loadStory = async () => {
        try {
            const story = await getStoryById(id)

            if (isMounted) {
            setAuthorName(story.authorName || '')
            setContent(story.content || '')
            setImageUrl(story.imageUrl || story.image || story.photoUrl || '')
            }
        } catch (err) {
            if (isMounted) {
            setError(err.message || 'Could not load the story.')
            }
        } finally {
            if (isMounted) {
            setLoading(false)
            }
        }
        }

        loadStory()

        return () => {
        isMounted = false
        }
    }, [id])

    const handleSubmit = async (event) => {
        event.preventDefault()
        setSaving(true)
        setError('')

        try {
        await updateStory(id, {
            authorName: authorName.trim(),
            content: content.trim(),
            // imageUrl: imageUrl.trim(),
        })
        navigate(`/stories/${id}`)
        } catch (err) {
        setError(err.message || 'Could not update the story.')
        } finally {
        setSaving(false)
        }
    }

    if (loading) {
        return (
        <div className="rounded-lg border border-slate-200 bg-white p-8 text-center shadow-sm">
            <p className="font-semibold text-slate-700">Loading story...</p>
        </div>
        )
    }

    return (
        <form
        onSubmit={handleSubmit}
        className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
        >
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-teal-700">
                Edit Story
            </p>
            <h2 className="mt-2 text-3xl font-bold text-slate-950">
                Update Story
            </h2>
            </div>
            <Link
            to={`/stories/${id}`}
            className="inline-flex items-center justify-center rounded-md border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-950 hover:text-slate-950"
            >
            Cancel
            </Link>
        </div>

        {error && (
            <p className="mb-6 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
            {error}
            </p>
        )}

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start">
            <div className="grid gap-5">
            <label className="grid gap-2">
            <span className="text-sm font-semibold text-slate-700">Author Name</span>
            <input
                value={authorName}
                onChange={(event) => setAuthorName(event.target.value)}
                required
                className="rounded-md border border-slate-300 bg-white px-4 py-3 text-slate-950 outline-none transition focus:border-teal-600 focus:ring-4 focus:ring-teal-100"
            />
            </label>

            {/* <label className="grid gap-2">
            <span className="text-sm font-semibold text-slate-700">Image URL</span>
            <input
                value={imageUrl}
                onChange={(event) => setImageUrl(event.target.value)}
                placeholder="Paste an image link"
                type="url"
                className="rounded-md border border-slate-300 bg-white px-4 py-3 text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-teal-600 focus:ring-4 focus:ring-teal-100"
            />
            </label> */}

            <label className="grid gap-2">
            <span className="text-sm font-semibold text-slate-700">Story Content</span>
            <textarea
                value={content}
                onChange={(event) => setContent(event.target.value)}
                required
                rows={10}
                className="resize-y rounded-md border border-slate-300 bg-white px-4 py-3 text-slate-950 outline-none transition focus:border-teal-600 focus:ring-4 focus:ring-teal-100"
            />
            </label>
            </div>

            {/* <div className="overflow-hidden rounded-lg border border-slate-200 bg-slate-100">
            <img
                src={imageUrl || heroImage}
                alt=""
                onError={(event) => {
                event.currentTarget.src = heroImage
                }}
                className="aspect-4/3 h-full w-full object-cover"
            />
            </div> */}
        </div>

        <div className="mt-8 flex justify-end">
            <button
            type="submit"
            disabled={saving}
            className="inline-flex min-w-36 items-center justify-center rounded-md bg-teal-700 px-5 py-3 text-sm font-bold text-white transition hover:bg-teal-800 disabled:cursor-not-allowed disabled:bg-slate-400"
            >
            {saving ? 'Updating...' : 'Update Story'}
            </button>
        </div>
        </form>
    )
}

export default EditStory
