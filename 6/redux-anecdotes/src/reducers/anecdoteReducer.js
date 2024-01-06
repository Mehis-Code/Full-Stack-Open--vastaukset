import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'


const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: (100000 * Math.random()).toFixed(0),
    votes: 0
  }
}

const anecSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    voteAnecdote: (state, action) => {
      const id = action.payload
      return state.map(anecdote =>
        anecdote.id !== id ? anecdote : { ...anecdote, votes: anecdote.votes + 1 }
      )
    },
    createAnecdote: (state, action) => {
      state.push(asObject(action.payload))
    },
    appendAnec: (state, action) => {
      state.push(action.payload)
    },
    setAnecdotes: (state, action) => {
      return action.payload
    }
  }
})
export const { voteAnecdote, createAnecdote, appendAnec, setAnecdotes } = anecSlice.actions
export default anecSlice.reducer

export const initializeAnecs = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnec = (content) => {
  return async dispatch => {
    const newAnec = await anecdoteService.createNew(content)
    dispatch(createAnecdote(newAnec))
  }
}
export const voteAnec = (id) => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    const FoundAnec = anecdotes.find(n => n.id === id)
    const changedAnec = {
      ...FoundAnec,
      votes: FoundAnec.votes + 1
    }
    await anecdoteService.update(id, changedAnec)
    dispatch(voteAnecdote(id))
  }
}