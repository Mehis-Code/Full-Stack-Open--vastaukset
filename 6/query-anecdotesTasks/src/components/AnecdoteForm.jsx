import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createAnec } from '../requests'
import NotiContext from './NotiContext'
import { useContext } from 'react'

const AnecdoteForm = () => {
  const [noti, notiDispatch] = useContext(NotiContext)
  const queryClient = useQueryClient()
  
  const createAnecMut = useMutation({
    mutationFn: createAnec,
    onSuccess: (newAnecdote) => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })},

    onError: (errorN) => {
    notiDispatch({type: 'ERROR', payload: errorN.response.data.error})
    setTimeout(() => {notiDispatch({type: 'RESET'})}, 5000)
  }
})

  const onCreate = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    createAnecMut.mutate({content, votes: 0})
    notiDispatch({type: 'NEW_NOTI', data: content})
    setTimeout(() => notiDispatch({type: 'RESET'}), 5000)
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
