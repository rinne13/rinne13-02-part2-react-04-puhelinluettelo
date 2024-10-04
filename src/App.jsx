import { useState } from 'react';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', id: 1 }  // убедитесь, что id уникален
  ]);
  const [newName, setNewName] = useState('');

  const [newNumber, setNewNumber] = useState('');

  const addName = (event) => {
    event.preventDefault();

    
      if (persons.findIndex((input) => input.name === newName) === -1) {
        const nameObject = {
          name: newName,
          id: persons.length + 1,  // уникальный идентификатор
          phonenumber: newNumber
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



  return (
    <div>
      <h2>Phonebook</h2>
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
        {persons.map(person => (
          <li key={person.id}>{person.name}   {person.phonenumber}</li>  // используем уникальный id
        
        ))}
      </ul>
    </div>
  );
}

export default App;
