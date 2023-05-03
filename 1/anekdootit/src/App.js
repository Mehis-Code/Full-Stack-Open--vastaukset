import { useState } from 'react'

const Button = (props) => {
  return (
    <button onClick={props.handle}>{props.text}</button>
  )
}

const Show = (props) => {

  return (
      <p>{props.text1} {props.val} {props.text2}</p>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))
  const [max, setMax] = useState(anecdotes[0])
  const [maxin, setMaxin] = useState(0)
  
  const next_func = () => {
    const random = Math.floor(Math.random() * anecdotes.length);
    setSelected(random);
  }

  const vote_func = () => {
    const copy = [...votes]
    copy[selected] += 1     
    setVotes(copy)
    var ma = copy[0];
    var maxIndex = 0;
    for (var i = 1; i < copy.length; i++) {
        if (copy[i] > ma) {
            maxIndex = i;
            ma = copy[i];
        }
    }
    setMax(anecdotes[maxIndex]);
    setMaxin(ma);
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <Show val={anecdotes[selected]}/>
      <Show val={votes[selected]} text1={"has"} text2={"votes"}/>
      <Button handle={vote_func} text={"votes"}/>
      <Button handle={next_func} text={"next anecdote"}/>
      <h1>Anecdote with most votes</h1>
      <Show val={max}/>
      <Show val={maxin} text1={"has"} text2={"votes"}/>
    </div>
  )
}

export default App