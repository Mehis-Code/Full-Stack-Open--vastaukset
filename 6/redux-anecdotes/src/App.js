import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import FilterComponent from './components/FilterComponent'
import Notification from './components/Notification'
import anecdoteService from './services/anecdotes'
import { setAnecdotes } from './reducers/anecdoteReducer'

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    anecdoteService.getAll().then(anecdotes =>
      dispatch(setAnecdotes(anecdotes))
    )
  }, [dispatch])

  return (
    <div>
      <AnecdoteForm />
      <FilterComponent />
      <Notification />
      <AnecdoteList />

    </div>
  )
}

export default App