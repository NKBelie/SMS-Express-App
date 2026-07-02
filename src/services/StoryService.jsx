const API_URL = 'https://sms-express-app-1-production-a843.up.railway.app/api/stories'

const request = async (path = '', options = {}) => {
  const response = await fetch(`${API_URL}${path}`, {
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

export const getStories = () => request()

export const getStoryById = (id) => request(`/${id}`)

export const createStory = (story) =>
  request('', { method: 'POST', body: JSON.stringify(story) })

export const updateStory = (id, story) =>
  request(`/${id}`, { method: 'PUT', body: JSON.stringify(story) })

export const deleteStory = (id) =>
  request(`/${id}`, { method: 'DELETE' })
