import { createSlice } from '@reduxjs/toolkit'
import { setNotification } from './notiReducer'


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