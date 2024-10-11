const PersonForm = ({ addName, newName, handleNameChange, newNumber, handleNumberChange }) => {
    return (
      <form onSubmit={addName}>
        <div class="title">
        Name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div class="title">
          Number: <input type="tel" id="phone" name="phone" pattern="(\+{0,1}\d{1,12})" required value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">Add</button>
        </div>
      </form>
    );
  };
  
export default PersonForm;


