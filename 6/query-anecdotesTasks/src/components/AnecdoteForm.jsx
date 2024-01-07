import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createAnec } from '../requests'

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  
  const createAnecMut = useMutation({
    mutationFn: createAnec,
    onSuccess: (newAnecdote) => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
  }})

  const onCreate = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    createAnecMut.mutate({content, votes: 0})
    console.log('new anecdote')
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
