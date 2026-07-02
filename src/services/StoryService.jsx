const BASE_URL = 'https://sms-express-app-1-production.up.railway.app/api/stories'

// Build URL safely using the URL object - prevents CWE-918 SSRF
const buildUrl = (id = '') => {
    const url = new URL(BASE_URL)
    if (id) url.pathname += `/${encodeURIComponent(id)}`
    return url.toString()
    }

    const request = async (url, options = {}) => {
    const response = await fetch(url, {
        headers: { 'Content-Type': 'application/json', ...options.headers },
        ...options,
    })

    if (!response.ok) {
        let message = `Request failed with status ${response.status}`
        try {
        const err = await response.json()
        message = err.message || err.error || message
        } catch {
        // response body is not JSON
        }
        throw new Error(message)
    }

    if (response.status === 204) return null

    return response.json()
    }

    export const getStories = () =>
    request(buildUrl())

    export const getStoryById = (id) =>
    request(buildUrl(id))

    export const createStory = (story) =>
    request(buildUrl(), { method: 'POST', body: JSON.stringify(story) })

    export const updateStory = (id, story) =>
    request(buildUrl(id), { method: 'PUT', body: JSON.stringify(story) })

    export const deleteStory = (id) =>
    request(buildUrl(id), { method: 'DELETE' })
