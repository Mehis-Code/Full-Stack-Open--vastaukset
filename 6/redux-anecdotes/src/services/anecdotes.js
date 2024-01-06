import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const createNew = async (content) => {
    const object = { content, votes: 0 }
    const response = await axios.post(baseUrl, object)
    return response.data
}

const update = async (id, newObject) => {
    const anecdotes = await getAll()
    const curr = anecdotes.find(n => n.id === id)
    const respo = await axios.put(`${baseUrl}/${id}`, { ...curr, votes: curr.votes + 1 })
    return respo.data
}

const anecdoteService = { getAll, createNew, update }
export default anecdoteService 