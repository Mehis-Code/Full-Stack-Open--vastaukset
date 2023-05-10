import React, { useState, useEffect } from 'react';
import services from './services/nettijutut';

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumb, setNewNumb] = useState('')
  const [filterA, setFilter] = useState('')
  const [newArr, setNewArr] = useState([])

  useEffect(() => {
    services.getAll().then(response => {
      setPersons(response);
      setNewArr(response)
    });
  }, []);

  const handleDelete = (id, name) => {
    if (window.confirm('delete ' + name + ' ?') != true) {
      return;
    }
    services.remove(id).then(() => {
      const updatedPersons = persons.filter(person => person.id !== id);
      setPersons(updatedPersons);
      setNewArr(updatedPersons);
      
    });
  };

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
      <Persons persons={newArr} handleDelete={handleDelete}/>
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

const Persons = ( {persons, handleDelete}) => {
  return(
  <div>
    <h2>Numbers</h2>
    {persons.map((person) => (<p key={person.id}>{person.name} {person.number} <button key = {person.id} onClick={(  
    ) => handleDelete(person.id, person.name)}> delete</button></p>))}
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
      const o = window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`);
      if (o == false){
        event.preventDefault()
        setNewName('')
        setNewNumb('')
        return;
      }
      else {
        event.preventDefault()
        const m = persons.filter((x) => x.name == newName);
        const newC = {
          id: m[0].id,
          name: newName,
          number: newNumb
        }
        let b = persons.filter(x => x.id != m[0].id);
        services.update(m[0].id, newC).then(() => {
          setPersons(b.concat(newC))
          setNewArr(b.concat(newC))
          setNewName('')
          setNewNumb('')
        });
        return;
      }
    }

    event.preventDefault()
    const pObject = {
      id: persons.length + 1,
      name: newName,
      number: newNumb
    }

    services.create(pObject).then(thing => {
      setPersons(persons.concat(pObject))
      setNewArr(persons.concat(pObject))
      setNewName('')
      setNewNumb('')
    })

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