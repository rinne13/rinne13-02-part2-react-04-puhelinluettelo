import { useEffect, useState } from 'react';
import contactService from './services/contactService'; // Импортируем contactService
import { v4 as uuidv4 } from 'uuid';
import Filter from './Filter';
import PersonForm from './PersonForm';
import Persons from './Persons';
import './App.css'; 

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');
  const [filterNumber, setFilterNumber] = useState(''); 

  const refreshPersons = () => {
    contactService.getAll().then(initialPersons => {
      console.log(initialPersons); // Посмотрите, что возвращает сервер
      if (Array.isArray(initialPersons)) {
        setPersons(initialPersons);
      } else {
        console.error('Полученные данные не являются массивом:', initialPersons);
      }
    });
  }
  
  useEffect(refreshPersons, []);

  

  const addName = (event) => {
    event.preventDefault();
    const existingPerson = persons.find(person => person.name === newName);

    if (!existingPerson) {
      const nameObject = {
        name: newName,
        id: uuidv4(),
        number: newNumber
      };

      contactService.create(nameObject).then(returnedPerson => {
        setPersons(persons.concat(returnedPerson)); 
      });
    } else {
      const confirmUpdate = window.confirm(`${newName} уже есть в телефонной книге. Заменить номер?`);
      if (confirmUpdate) {
        const updatedPerson = { ...existingPerson, number: newNumber };
        contactService.update(existingPerson.id, updatedPerson).then(returnedPerson => {
          setPersons(persons.map(person => person.id !== existingPerson.id ? person : returnedPerson));
          setNewName('');
          setNewNumber('');
        });
      }
    }
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this contact?')) {
      contactService.remove(id)
        .then(refreshPersons)
        .catch(error => {
          console.error('Error deleting contact:', error);
        });
    }
  };

  const handleNameChange = (event) => setNewName(event.target.value);
  const handleNumberChange = (event) => setNewNumber(event.target.value);
  const handleFilterChange = (event) => setFilter(event.target.value);
  const handleFilterNumberChange = (event) => setFilterNumber(event.target.value); 

  const personsToShow = persons.filter(person =>
    person.name.toLowerCase().includes(filter.toLowerCase()) &&
    person.number.includes(filterNumber)
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
      <Persons personsToShow={personsToShow} handleDelete={handleDelete} />
    </div>
  );
};

export default App;