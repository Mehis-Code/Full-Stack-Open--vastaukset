import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAnecs, voteAnec } from './requests.js'

const App = () => {
  const queryClient = useQueryClient();


  const voteAnecMut = useMutation({
    mutationFn: voteAnec,
    onSuccess: (newAnecdote) => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
  }})


  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecs,
  })
  console.log(JSON.parse(JSON.stringify(result)))


  if (result.isLoading) {
    return <div>Loading...</div>
  }
  if(result.isError){
    return <div>Error in loading process {result.error.message}</div>
  }

  const handleVote = (anecdote) => {
    voteAnecMut.mutate({id: anecdote.id, content: anecdote.content, votes: anecdote.votes + 1})
  }

  const anecdotes = result.data.sort((a, b) => b.votes - a.votes)

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm  />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
