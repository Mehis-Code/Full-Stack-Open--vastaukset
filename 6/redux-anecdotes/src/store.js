import { configureStore } from '@reduxjs/toolkit'
import anecdoteReducer, { setAnecdotes, } from './reducers/anecdoteReducer'
import filterReducer from './reducers/filterReducer'
import notiReducer from './reducers/notiReducer'
import anecdoteService from './services/anecdotes'

const store = configureStore({
    reducer: {
        anecdotes: anecdoteReducer,
        filter: filterReducer,
        notes: notiReducer
    },
})

anecdoteService.getAll().then(anecdotes =>
    store.dispatch(setAnecdotes(anecdotes))
)

export default store