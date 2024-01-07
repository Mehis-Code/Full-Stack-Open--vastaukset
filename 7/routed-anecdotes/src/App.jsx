import { useState } from 'react'
import {
  BrowserRouter as Router,
  Routes, Route, Link, useMatch, useParams
} from 'react-router-dom'
import  { useField } from './hooks/index.js'

const Menu = () => {
  const padding = {
    paddingRight: 5
  }
  return (
    <div>
      <Link to='/' style={padding}>anecdotes</Link>
      <Link to='/createnew' style={padding}>create new</Link>
      <Link to='/about' style={padding}>about</Link>
    </div>
  )
}

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map(anecdote =>
         <li key={anecdote.id} >
          <Link to={`/anecdotes/${anecdote.id}`}>  {anecdote.content} </Link>
          </li>)}
    </ul>
  </div>
)
const SingleAnecdote = ({anecdotSi}) => {
  return (
  <div>
    <h2><strong>{anecdotSi.content} by {anecdotSi.author} </strong></h2>
    <p>{`has ${anecdotSi.votes} votes`} </p>
    <p> For more information please check out <Link to={anecdotSi.info}>{anecdotSi.info}</Link></p>
  </div>)
}
const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>An anecdote is a brief, revealing account of an individual person or an incident.
      Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
      such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
      An anecdote is "a story with a point."</em>

    <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
  </div>
)

const Footer = () => (
  <div>
    Anecdote app for <a href='https://fullstackopen.com/'>Full Stack Open</a>.

    See <a href='https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js'>https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js</a> for the source code.
  </div>
)

const CreateNew = (props) => {
  const content = useField('content')
  const author = useField('author')
  const info = useField('field')

  const resetFields = (event) => {
    event.preventDefault()
    content.resetfi()
    author.resetfi()
    info.resetfi()
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0
    })
  }
  const remoReset = ({resetfi, ...rest}) => rest
  
  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...remoReset(content)} />
        </div>
        <div>
          author
          <input {...remoReset(author)} />
        </div>
        <div>
          url for more info
          <input {...remoReset(info)} />
        </div>
        <button>create</button>
        <button onClick={resetFields}>reset</button>
      </form>
    </div>
  )

}

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2
    }
  ])

  const [notification, setNotification] = useState('')

  const Notification = ({ notification }) => {
    if (notification === '') {
      return null
    }
    return (
      <div>
        {notification}
      </div>
    )
  }
  const setNoti = (text) => {
    setNotification(text) 
    setTimeout(() => {setNotification('')}, 5000)
  }

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(anecdote))
    setNoti(`a new anecdote was added: "${anecdote.content}" `)
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }
  const match = useMatch('/anecdotes/:id')
  const anecdotSi = match ? anecdotes.find(anecdote => anecdote.id === Number(match.params.id)) : null

  return (
      <div>
        <h1>Software anecdotes</h1>
        <Menu />
        <Notification notification={notification} />
        <Routes>
          <Route path='/' element={<AnecdoteList anecdotes={anecdotes} />}/>
          <Route path='/createnew' element={<CreateNew addNew={addNew} />}/>
          <Route path='/about' element={<About />}/>
          <Route path='/anecdotes/:id' element={<SingleAnecdote anecdotSi={anecdotSi} />}/>
        </Routes>
        <footer>
          <Footer />
        </footer>
      </div>
  )
}

export default App
