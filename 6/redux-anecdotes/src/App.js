import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import FilterComponent from './components/FilterComponent'

const App = () => {
  return (
    <div>
      <AnecdoteForm />
      <FilterComponent />
      <AnecdoteList />

    </div>
  )
}

export default App