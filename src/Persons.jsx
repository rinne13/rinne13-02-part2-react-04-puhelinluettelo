import contactService from './services/contactService'; // Импортируем contactService




const Persons = ({ personsToShow, handleDelete }) => {
  return (
      <ul>
          {personsToShow.map(person => (
              <li key={person.id}>
                  <p>{person.name} {person.number}
                      <button onClick={() => handleDelete(person.id)}>Delete</button> 
                  </p>
              </li>
          ))}
      </ul>
  );
}

/*const handleDelete = (id) => {
  if (window.confirm('Are you sure you want to delete this contact?')) {
    contactService.remove(id)
      .then(() => {
        setPersons(contactService.getAll());
      })
      .catch(error => {
        console.error('Error deleting contact:', error);
      });
  }
};
*/



export default Persons;
