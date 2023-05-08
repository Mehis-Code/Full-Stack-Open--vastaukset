import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([    
  { id: 1, name: 'Arto Hellas', number: '040-123456' },
  { id: 2,  name: 'Ada Lovelace', number: '39-44-5323523' },
  { id: 3,  name: 'Dan Abramov', number: '12-43-234345' },
  {  id: 4, name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumb, setNewNumb] = useState('')
  const [filterA, setFilter] = useState('')
  const [newArr, setNewArr] = useState(persons)

  return (
    <div>
      <Phonebook persons={persons} filter={filterA} setFilter={setFilter} setNewArr={setNewArr}/>
      <PersonForm         
        persons={persons}
        newName={newName}
        newNumb={newNumb}
        setNewName={setNewName}
        setNewNumb={setNewNumb}
        setPersons={setPersons} 
        setNewArr={setNewArr}/>
      <Persons persons={newArr} />
    </div>
  )
}

const Phonebook = ({persons, filter, setFilter, setNewArr}) => {
  const handleFilt = (event) => {
    const filterValue = event.target.value;
    setFilter(filterValue);
    const filteredArr = persons.filter((person) => person.name.toLowerCase().includes(filterValue.toLowerCase()));
    setNewArr(filteredArr);
  };
  return (
  <div>
    <h2>Phonebook</h2>
    filter shown with
    <input value={filter} onChange={handleFilt} />
  </div>
  )
}

const Persons = ( {persons}) => {
  return(
  <div>
    <h2>Numbers</h2>
    {persons.map((person) => (<p key={person.id}>{person.name} {person.number}</p>))}
  </div>
  )
}

const PersonForm = ({ persons, newName, newNumb, setNewName, setNewNumb, setPersons, setNewArr}) => {
  const handlePer = (event) => {
    setNewName(event.target.value)
  }
  const handleNum = (event) => {
    setNewNumb(event.target.value)
  }
  const newP = (event) => {
    const a = persons.map((x) => (x.name))
    if (a.includes(newName)){
      event.preventDefault()
      setNewName('')
      setNewNumb('')
      alert(`${newName} is already added to phonebook`)
      return;
    }

    event.preventDefault()
    const pObject = {
      id: persons.length + 1,
      name: newName,
      number: newNumb
    }
    setPersons(persons.concat(pObject))
    setNewArr(persons.concat(pObject))
    setNewName('')
    setNewNumb('')
      }  
      return (
    <div>
    <h2>add a new</h2>
    <form>
      <div>
        name: <input 
        value={newName}
        onChange={handlePer}/>
      </div>
      <div>
        number: <input
         value={newNumb}
        onChange={handleNum}
        />
      </div>
      <div>
        <button type="submit" onClick={newP}>add</button>
      </div>
    </form>
    </div>
  )
}

export default App