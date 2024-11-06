import contactService from './services/contactService'; // Импортируем contactService




const Persons = ({ personsToShow, handleDelete }) => {
  return (
    
      <ul>
          {personsToShow.map(person => (
              <li key={person.id}>
                  <p>{person.name} {person.number}
                      <button onClick={() => handleDelete(person)}>Delete</button> 
                  </p>
              </li>
          ))}
      </ul>
  );
}

export default Persons;
