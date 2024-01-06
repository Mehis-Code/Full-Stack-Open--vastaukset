import { useDispatch, useSelector } from "react-redux"
import { voteAnec } from "../reducers/anecdoteReducer"

export const voteAnecdoteAndNotify = (id, content) => {
    return dispatch => {
        dispatch(voteAnec(id))
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
        state.anecdotes.filter(anecdote => typeof anecdote.content === 'string' && anecdote.content.toLowerCase().includes(state.filter))
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