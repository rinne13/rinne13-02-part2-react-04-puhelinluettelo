import { useEffect, useState } from 'react';
import contactService from './services/contactService'; // Импортируем contactService
import { v7 as uuidv7 } from 'uuid';
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
  const [notification, setNotification] = useState(null);


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

  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 3000); // Сообщение исчезает через 3 секунды
  };
  

  

  const addName = (event) => {
    event.preventDefault();
    const existingPerson = persons.find(person => person.name === newName);

    if (!existingPerson) {
      const nameObject = {
        name: newName,
        id: uuidv7(),
        number: newNumber
      };

      contactService.create(nameObject).then(returnedPerson => {
        setPersons(persons.concat(returnedPerson));
        setNewName('');
        setNewNumber('');
        showNotification(`${newName} has been added`, 'success');
        console.log(`${newName} has been added!`, 'success');

      }).catch(error => {
        showNotification('Error adding person.', 'error');
      });
    } else {
      const confirmUpdate = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`);
      if (confirmUpdate) {
        const updatedPerson = { ...existingPerson, number: newNumber };
        contactService.update(existingPerson.id, updatedPerson).then(returnedPerson => {
          setPersons(persons.map(person => person.id !== existingPerson.id ? person : returnedPerson));
          setNewName('');
          setNewNumber('');
          showNotification(`${newName}'s number has been updated!`, 'success');
          console.log(`${newName}'s number has been updated!`)
        }).catch(error => {
          showNotification('Error updating number.', 'error');
        });
      }
    }
  };

  const handleDelete = (person) => {
    if (window.confirm('Are you sure you want to delete this contact?')) {
      contactService.remove(person.id).then(() => {
        
        showNotification('Contact has been deleted!', 'success');
        console.log('Contact has been deleted!', 'success');
      }).catch(error => {
        showNotification(`Information of ${person.name} has already been removed from the server`, 'error');
          console.error('Error deleting contact:', error);
        }).finally(() => refreshPersons());
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
      {notification && (
        <div className={`notification ${notification.type}`}>
          {notification.message}
        </div>
      )}
      
      <div className="input-container">
        <Filter
          filter={filter}
          filterNumber={filterNumber}
          handleFilterChange={handleFilterChange}
          handleFilterNumberChange={handleFilterNumberChange}
        />
      </div>

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