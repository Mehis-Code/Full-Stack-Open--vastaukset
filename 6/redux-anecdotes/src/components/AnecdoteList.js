import { useDispatch, useSelector } from "react-redux"
import { voteAnec } from "../reducers/anecdoteReducer"
import { setNotification } from "../reducers/notiReducer"

export const voteAnecdoteAndNotify = (id, content) => {
    return async dispatch => {
        dispatch(voteAnec(id))
        dispatch(setNotification(`you voted '${content}'`))
        setTimeout(() => {
            dispatch(setNotification(''))
        }, 5000)
    }
}

const Anecdote = ({ anecdote, handleClick }) => {
    return (
        <div>
            <div>
                {anecdote.content}
            </div>
            <div>
                has {anecdote.votes}
                <button onClick={handleClick}>vote</button>
            </div>
        </div>
    )
}

const AnecdoteList = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(state =>
        state.anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(state.filter.toLowerCase()))
    )

    return (
        <div>
            <h2>Anecdotes</h2>
            {anecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
                <Anecdote
                    key={anecdote.id}
                    handleClick={() => dispatch(voteAnecdoteAndNotify(anecdote.id, anecdote.content))}
                    anecdote={anecdote}
                />
            )}
        </div>
    )
}

export default AnecdoteList