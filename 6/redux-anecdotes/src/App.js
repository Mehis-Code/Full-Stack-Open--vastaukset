import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import FilterComponent from './components/FilterComponent'
import Notification from './components/Notification'

const App = () => {
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