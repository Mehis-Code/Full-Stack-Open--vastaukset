import { useDispatch } from 'react-redux';
import { createAnecdote } from '../reducers/anecdoteReducer';
import { setNotification } from '../reducers/notiReducer';


const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const addAnecdote = (event) => {
        event.preventDefault()
        const contentOf = event.target.Anecdote.value
        event.target.Anecdote.value = ''
        dispatch(createAnecdote(contentOf))
        dispatch(setNotification(`you created a new anecdote: '${contentOf}'`))
    }

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={addAnecdote}>
                <div>
                    <input name="Anecdote" />
                </div>
                <button type="submit">create</button>
            </form>
        </div>
    )
}


export default AnecdoteForm;