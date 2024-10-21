import { useEffect, useState } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import Filter from './Filter';
import PersonForm from './PersonForm';
import Persons from './Persons';
import './App.css'; 

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: uuidv4() },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: uuidv4() },
    { name: 'Dan Abramov', number: '12-43-234345', id: uuidv4() },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: uuidv4() }
  ]);

  useEffect(() => {
    axios 
    .get('http://localhost:3002/persons')
    .then(response => {
      setPersons(response.data);
        })

  }, []);

  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');
  const [filterNumber, setFilterNumber] = useState(''); // фильтрация по номеру

  const addName = (event) => {
    event.preventDefault();
    if (persons.findIndex((input) => input.name === newName) === -1) {
      const nameObject = {
        name: newName,
        id: uuidv4(),
        number: newNumber
      };
      setPersons(persons.concat(nameObject));
      setNewName('');
      setNewNumber('');
    } else {
      alert(`${newName} is already added to phonebook`);
    }
  };

  const handleNameChange = (event) => setNewName(event.target.value);
  const handleNumberChange = (event) => setNewNumber(event.target.value);
  const handleFilterChange = (event) => setFilter(event.target.value);
  const handleFilterNumberChange = (event) => setFilterNumber(event.target.value); // обработчик для номера

  // Фильтрация по имени и номеру
  const personsToShow = persons.filter(person =>
    person.name.toLowerCase().includes(filter.toLowerCase()) &&
    person.number.includes(filterNumber) // фильтруем по номеру
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter
        filter={filter}
        filterNumber={filterNumber}
        handleFilterChange={handleFilterChange}
        handleFilterNumberChange={handleFilterNumberChange}
      />

      <h3>Add a new</h3>
      <PersonForm
        addName={addName}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />

      <h3>Numbers</h3>
      <Persons personsToShow={personsToShow} />
    </div>
  );
};

export default App;
