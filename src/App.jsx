import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';


const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');
  const [FilterNumber, setFilterNumber] = useState('');
  const addName = (event) => {
    event.preventDefault();

    
      if (persons.findIndex((input) => input.name === newName) === -1) {
        const nameObject = {
          name: newName,
          id: uuidv4(),  // уникальный идентификатор
          number: newNumber
        };
    
        setPersons(persons.concat(nameObject));
        setNewName('');
        setNewNumber('');
    
       
       } else {
            alert(`${newName} is already added to phonebook`)
          }
          
      
    };


   
 



  // Обработка изменения текста в поле ввода
  const handleNameChange = (event) => {
    
    setNewName(event.target.value);
    console.log(event.target.value);
    
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
    console.log(event.target.value);

  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
    console.log(event.target.value);
  };

  const handleFilterNumberChange = (event) => {
    setFilterNumber(event.target.value);
    console.log(event.target.value);
  }

  const personsToShow = persons.filter(person => 
    person.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase()) &&
    person.number.includes(FilterNumber) 
  );
  


  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        Name filter shown with: <input value={filter} onChange={handleFilterChange} />
      </div>
      <div>Number filter shown with: <input value={FilterNumber} onChange={handleFilterNumberChange} /></div>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
        number: <input type="tel" id="phone" name="phone" pattern="(\+{0,1}\d{1,12})" required value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      
      <h2>Numbers</h2>
      <div>debug: {newName}{newNumber}</div>
      <ul>
        {personsToShow.map(person => (
          <li key={person.name}>{person.name}   {person.number}</li>  //  
        
        ))}
      </ul>
    </div>
  );
}

export default App;
