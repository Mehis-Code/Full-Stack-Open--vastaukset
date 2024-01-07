import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

export const getAnecs = () => axios.get(baseUrl).then(res => res.data)


export const createAnec = (content) => axios.post(baseUrl, content).then(res => res.data)

export const voteAnec = (anecdote) => axios.put(`${baseUrl}/${anecdote.id}`, anecdote).then(res => res.data)