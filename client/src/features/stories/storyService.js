import axios from '../../utils/axiosConfig'

// Get all stories
const getAllStories = async () => {
  const response = await axios.get('/stories')
  return response.data
}

// Add new story (only for logged-in users)
// Expects a JSON payload: { title, excerpt, image, location }
const addStory = async (data) => {
  const response = await axios.post('/stories', data)
  return response.data
}

// Get a single story by ID (for detail page later if needed)
const getStoryById = async (id) => {
  const response = await axios.get(`/stories/${id}`)
  return response.data
}

const storyService = {
  getAllStories,
  addStory,
  getStoryById,
  toggleLike: async (id) => {
    const response = await axios.post(`/stories/${id}/like`)
    return response.data
  },
}

export default storyService
